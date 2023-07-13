import * as Element from './element';
import * as Textures from './textures';
import { Offset, Position } from "../Types";

export function process(element: SceneNode, offset: Offset, name: string): {code: string, metaCode: string} {
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
    elementPosition = Element.getAbsolutePosition(elementPosition as Position, 'rotation' in element ? element.rotation : 0);
    let position = Element.getPosition(elementPosition, offset);

    // Generate code
    code = `\tdxDrawImage(${position}, '${Textures.imagePath(name)}')\n`;
    metaCode = `\t<file src="${Textures.imagePath(name)}"/>\n`;

    return {code, metaCode};
}