import { settings } from "../settings";
import { Offset, Position } from "../Types";
import { getPointFromDistanceRotation } from "../useful";
import * as Rectangle from './rectangle';
let focusElements: SceneNode[] = [];

export function resetFocusElements() {
    focusElements = [];
}

export function isMaskGroup(node: SceneNode): boolean {
    if (node.type === "GROUP") {
        const children = node.children;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if ('isMask' in child && child.isMask) return true;
        }
    }
    return false;
}

export function getAbsolutePosition(position: Position, angle: number): Position {
    let lt = {x: position.x, y: position.y};
    let rt = getPointFromDistanceRotation(position.x, position.y, position.width, angle);
    let lb = getPointFromDistanceRotation(position.x, position.y, position.height, angle + 90);
    let rb = getPointFromDistanceRotation(rt.x, rt.y, position.height, angle + 90);

    let x = Math.min(lt.x, rt.x, lb.x, rb.x);
    let y = Math.min(lt.y, rt.y, lb.y, rb.y);
    let tx = Math.max(lt.x, rt.x, lb.x, rb.x);
    let ty = Math.max(lt.y, rt.y, lb.y, rb.y);
    let width = tx - x;
    let height = ty - y;

    return {
        x: x,
        y: y,
        width: width,
        height: height
    };
}

function addFocusElement(element: SceneNode) {
    focusElements.push(element);
}

export function focusOnElements(frame: SceneNode) {
    // figma.viewport.scrollAndZoomIntoView([frame] || focusElements);
    figma.currentPage.selection = focusElements;
}

export function getPosition(position: Position, offset: Offset): string {
    let x: string | number = position.x;
    let y: string | number = position.y;
    let width: string | number = position.width;
    let height: string | number = position.height;
    let zoom = settings.zoom ? '/zoom' : '';
    let xAlign = offset.align.charAt(0);
    let yAlign = offset.align.charAt(1);

    if(xAlign == 'L') x = `${x}${zoom}`;
    else if(xAlign == 'C') {
        x = x - offset.width/2;
        x = `sx/2 + ${x}${zoom}`;
    } else if(xAlign == 'R') {
        x = offset.width - x;
        x = `sx - ${x}${zoom}`;
    }

    if(yAlign == 'T') y = `${y}${zoom}`;
    else if(yAlign == 'M') {
        y = y - offset.height/2;
        y = `sy/2 + ${y}${zoom}`;
    } else if(yAlign == 'B') {
        y = offset.height - y;
        y = `sy - ${y}${zoom}`;
    }

    return `${x}, ${y}, ${width}${zoom}, ${height}${zoom}`;
}

export function processNode(element: SceneNode, offset: Offset): {code: string, metaCode: string} {
    let code = '';
    let metaCode = '';
    code += `-- ${element.type}: ${element.name}\n`;

    if(isMaskGroup(element)) {

    } else if('children' in element) {
        for(let child of element.children) {
            let data = processNode(child, offset);
            code += data.code;
            metaCode += data.metaCode;
        }
    }

    if(element.type == 'RECTANGLE') {
        let data = Rectangle.process(element, offset);
        code += data.code;
        metaCode += data.metaCode;

        addFocusElement(element);
    }

    return {code, metaCode};
}