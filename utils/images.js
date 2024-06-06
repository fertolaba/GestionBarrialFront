import { generateHexadecimal } from "./numbers";

export function generatePlaceholderImage(width = 600, height = 400, backgroundColor = generateHexadecimal(), textColor = generateHexadecimal(), text = `${width}x${height}`) {
    return `https://placehold.co/${width}x${height}/${backgroundColor}/${textColor}.png?font=roboto&text=${text}`;
}