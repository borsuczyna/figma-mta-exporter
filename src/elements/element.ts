import { settings } from "../settings";
import { Fill, Offset, Position } from "../Types";
import { getPointFromDistanceRotation } from "../useful";

import * as Rectangle from './rectangle';
import * as Raw from './raw';
import * as Variable from './variable';
import * as Text from './text';

let focusElements: SceneNode[] = [];
let variables: {
    [key: string]: string
} = {};
let mainFrame: FrameNode;
let currentVariable: string | undefined = undefined;

export function resetCurrentVariable() {
    currentVariable = undefined;
}

export function setMainFrame(frame: FrameNode) {
    mainFrame = frame;
}

export function resetFocusElements() {
    focusElements = [];
}

export function defineVariablePosition(name: string, position: string) {
    variables[name] = position;
}

export function getVariables(): string {
    let code = 'local settings = {\n';

    for(let name in variables) {
        code += `\t['${name}'] = {${variables[name]}}\n`
    }

    code += '}'

    return code;
}

export function resetVariables() {
    variables = {};
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

    if(currentVariable) {
        return `settings['${currentVariable}'][1] + ${x}${zoom}, settings['${currentVariable}'][2] + ${y}${zoom}, ${width}${zoom}, ${height}${zoom}`
    } else {
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
}

export function toColor(color: Fill): string {
    return `tocolor(${Math.floor(color.color.r*255)}, ${Math.floor(color.color.g*255)}, ${Math.floor(color.color.b*255)}, ${Math.floor(color.opacity*255)})`
}

export function processNode(element: SceneNode, offset: Offset, variable: string | undefined): {code: string, metaCode: string} {
    let code = '';
    let metaCode = '';
    
    let preVariable = variable;
    if(element.type == 'FRAME' && element != mainFrame) {
        variable = Variable.process(element, offset, variable);
        currentVariable = variable;
    }
    
    code += `-- ${element.type}: ${element.name} ${currentVariable || ''}\n`;

    if(element.type == 'GROUP' && element.name.startsWith('<single>')) {
        let name = '_single_' + element.name.slice('<single>'.length);
        let data = Raw.process(element, offset, name);
        code += data.code;
        metaCode += data.metaCode;

        addFocusElement(element);
    } else if(isMaskGroup(element) || element.type == 'VECTOR') {
        let data = Raw.process(element, offset, element.name);
        code += data.code;
        metaCode += data.metaCode;

        addFocusElement(element);
    } else if('children' in element) {
        for(let child of element.children) {
            let data = processNode(child, offset, variable);
            code += data.code;
            metaCode += data.metaCode;
        }
    }

    if(element.type == 'RECTANGLE') {
        let data = Rectangle.process(element, offset);
        code += data.code;
        metaCode += data.metaCode;

        addFocusElement(element);
    } else if(element.type == 'TEXT') {
        code += Text.process(element, offset);
    }

    variable = preVariable;
    currentVariable = variable;

    return {code, metaCode};
}