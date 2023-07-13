import * as Element from './element';
import * as Textures from './textures';
import { Offset, Position } from "../Types";

export function process(element: RectangleNode, offset: Offset): {code: string, metaCode: string} {
    let code = '';
    let metaCode = '';
    let elementPosition = {
        x: element.x,
        y: element.y,
        width: element.width,
        height: element.height,
    };

    // Strokes
    let offSize = 0;
    if(element.strokeAlign == 'OUTSIDE') {
        offSize = element.strokeWeight as number;
    } else if(element.strokeAlign == 'CENTER') {
        offSize = (element.strokeWeight as number) / 2;
    }

    // Effects
    // @TODO

    elementPosition.x -= offSize;
    elementPosition.y -= offSize;
    elementPosition.width += offSize * 2;
    elementPosition.height += offSize * 2;

    // Calculate absolute position depending on rotation
    elementPosition = Element.getAbsolutePosition(elementPosition as Position, element.rotation)
    let position = Element.getPosition(elementPosition, offset);

    // Generate code
    code = `\tdxDrawImage(${position}, '${Textures.imagePath(element.name)}')\n`;
    metaCode = `\t<file src="${Textures.imagePath(element.name)}"/>\n`;

    return {code, metaCode};
}