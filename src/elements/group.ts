import * as Element from './element';
import * as Textures from './textures';
import { Offset, Position } from "../Types";

export function process(element: GroupNode, offset: Offset, name: string): {code: string, metaCode: string} {
    let code = '';
    let metaCode = '';
    let elementPosition = {
        x: element.x,
        y: element.y,
        width: element.width,
        height: element.height,
    };

    // Effects
    // @TODO

    // Calculate absolute position depending on rotation
    elementPosition = Element.getAbsolutePosition(elementPosition as Position, element.rotation)
    let position = Element.getPosition(elementPosition, offset);

    // Add texture to cache
    Textures.addTexture(name);

    // Generate code
    let variable = `textures.${Textures.getTextureVariable(name)}`;
    code = `\tdxDrawImage(${position}, ${variable}.texture)\n`;
    metaCode = `\t<file src="${Textures.imagePath(name)}"/>\n`;

    return {code, metaCode};
}