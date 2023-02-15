import * as Element from './element';
import * as Textures from './textures';
import { Offset, Position } from "../Types";

export function process(element: RectangleNode, offset: Offset): {code: string, metaCode: string} {
    let code = '';
    let metaCode = '';
    let elementPosition = element as Position;

    // Strokes
    let strokeSize = 0;
    if(element.strokeAlign == 'OUTSIDE') {
        strokeSize = element.strokeWeight as number;
    } else if(element.strokeAlign == 'CENTER') {
        strokeSize = (element.strokeWeight as number) / 2;
    }

    // Effects
    for(let effect of element.effects) {
        if(effect.type == 'DROP_SHADOW') {
            
        }
    }

    elementPosition.x -= strokeSize;
    elementPosition.y -= strokeSize;
    elementPosition.width += strokeSize * 2;
    elementPosition.height += strokeSize * 2;

    elementPosition = Element.getAbsolutePosition(elementPosition as Position, element.rotation)
    let position = Element.getPosition(elementPosition, offset);

    Textures.addTexture(element.name);

    let variable = `textures.${Textures.variableName(element.name)}`;
    code = `\tdxDrawImage(${position}, ${variable}.texture)\n`;
    metaCode = `\t<file src="${Textures.imagePath(element.name)}"/>\n`;

    if(element.rotation) {
        // code = Element.generateRotation
    }

    return {code, metaCode};
}