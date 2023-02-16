import * as Element from './element';
import { Offset, Position } from "../Types";

export function process(element: FrameNode, offset: Offset, variable: string | undefined): string {
    let elementPosition = {
        x: element.x,
        y: element.y,
        width: element.width,
        height: element.height,
    };

    // Calculate absolute position depending on rotation
    elementPosition = Element.getAbsolutePosition(elementPosition as Position, 'rotation' in element ? element.rotation : 0);
    let position = Element.getPosition(elementPosition, offset);

    variable = element.name;
    Element.defineVariablePosition(element.name, position);

    // Generate code
    return variable;
}