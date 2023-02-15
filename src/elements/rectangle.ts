import * as Element from './element';
import { Offset, Position } from "../Types";


export function process(element: RectangleNode, offset: Offset): {code: string, metaCode: string} {
    let code = '';
    let metaCode = '';
    let elementPosition: Position = {
        x: element.x + offset.x,
        y: element.y + offset.y,
        width: element.width,
        height: element.height
    }

    if(element.strokeAlign == 'OUTSIDE') {
        let stroke = element.strokeWeight as number;
        elementPosition.x -= stroke;
        elementPosition.y -= stroke;
        elementPosition.width += stroke * 2;
        elementPosition.height += stroke * 2;
    } else if(element.strokeAlign == 'CENTER') {
        let stroke = element.strokeWeight as number;
        elementPosition.x -= stroke/2;
        elementPosition.y -= stroke/2;
        elementPosition.width += stroke;
        elementPosition.height += stroke;
    }

    let position = Element.getPosition(elementPosition, offset);

    code = `\tdxDrawImage(${position}, "${Element.imagePath(element.name)}")\n`;
    metaCode = `\t<file src="${Element.imagePath(element.name)}"/>\n`;

    return {code, metaCode};
}