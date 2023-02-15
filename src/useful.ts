export function convertToCamelCase(str: string): string {
    // Remove all special characters and replace spaces with underscores
    const cleaned = str.replace(/[^a-zA-Z0-9_]/g, "").replace(/\s+/g, "_");
  
    // Split the string into an array of words
    const words = cleaned.split("_");
  
    // Capitalize the first letter of each word (except the first word)
    const capitalized = words
    .map((word, i) => {
        if (i === 0) {
            return word;
        } else {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
    })
    .join("");
  
    return capitalized.charAt(0).toLocaleLowerCase() + capitalized.slice(1);
}

export function getPointFromDistanceRotation(x: number, y: number, distance: number, angle: number): { x: number, y: number } {
    // Convert angle from degrees to radians
    const radians = angle * (Math.PI / 180);
  
    // Calculate the new x and y coordinates
    const newX = x + distance * Math.cos(radians);
    const newY = y + distance * Math.sin(radians);
  
    return { x: newX, y: newY };
}