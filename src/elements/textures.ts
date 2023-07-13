import { settings } from "../settings";

export function imagePath(input: string): string {
    const cleaned = input.replace(/[^a-zA-Z0-9_-]/g, '');
    // const truncated = cleaned.substring(0, 16);
    // return `${settings.path}${truncated}.png`;
    return `${settings.path}${input}.png`;
}