import { settings } from "../settings";
import { convertToCamelCase } from "../useful";

let textures: {
    variable: string,
    texture: string
}[] = [];

export function resetTextures() {
    textures = [];
}

export function imagePath(input: string): string {
    const cleaned = input.replace(/[^a-zA-Z0-9_-]/g, '');
    // const truncated = cleaned.substring(0, 16);
    // return `${settings.path}${truncated}.png`;
    return `${settings.path}${input}.png`;
}

export function variableName(input: string): string {
    const cleaned = input.replace(/[^a-zA-Z0-9_]/g, '');
    // const truncated = cleaned.substring(0, 16);
    return cleaned.toLocaleLowerCase();
}

export function getTextureVariable(texture: string): string {
    return convertToCamelCase(texture);
}

export function addTexture(texture: string) {
    if(textures.find(e => e.texture == texture) != undefined) return;

    let variable = getTextureVariable(texture);
    // let tempVariable = variable;
    // let i = 1;
    // while(textures.find(e => e.variable == tempVariable) != undefined) {
    //     tempVariable = variable + (i++);
    // }
    // variable = tempVariable;

    textures.push({
        variable: variable,
        texture: imagePath(texture)
    });
}

export function getTexturesCode(): string {
    let code = '\t\t\t\tloadTextures({\n';

    for(let texture of textures) {
        code += `\t\t\t\t\t\t{'${texture.variable}', '${texture.texture}'},\n`
    }

    code += '\t\t\t\t});'

    return code;
}