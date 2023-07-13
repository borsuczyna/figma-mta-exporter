import * as Element from './element';
import * as Textures from './textures';
import { Fill, Offset, Position } from "../Types";
import { settings } from '../settings';

export function process(element: TextNode, offset: Offset): string {
    let code = '';
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
    let xAlign = element.textAlignHorizontal.toLocaleLowerCase();
    let yAlign = element.textAlignVertical.toLocaleLowerCase();
    let zoom = settings.zoom ? '/zoom' : '';

    elementPosition = Element.getAbsolutePosition(elementPosition as Position, element.rotation)
    let position = Element.getPosition(elementPosition, offset, !settings.wordWrap, xAlign, yAlign);

    let [x, y, w, h] = position.split(',').map(e => e.trim());

    if(settings.wordWrap) {
        position = `${x}, ${y}, (${x}) + (${w}), (${y}) + (${h})`;
    } else {
        position = `${x}, ${y}, nil, nil`;
    }

    let color = (element.fills as unknown as any)[0] as Fill | undefined;
    if(color) {
        let text = element.characters;
        while(text.includes('\n')) {
            text = text.replace('\n', '<!newline!>');
        }

        let size = parseFloat(element.fontSize.toLocaleString())/1.5;
        let font = `getFigmaFont('${(element.fontName as FontName).family}-${(element.fontName as FontName).style}', ${size}${zoom})`;
        code = `\tdxDrawText('${text}', ${position}, ${Element.toColor(color)}, 1, ${font}, '${xAlign}', '${yAlign}'${settings.wordWrap ? ', false, true' : ''})\n`;
    }
    return code;
}