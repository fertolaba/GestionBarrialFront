export function generateHexadecimal() {
    let randomNum = Math.floor(Math.random() * 16777216);
    let hexString = randomNum.toString(16).toUpperCase().padStart(6, '0');
    return hexString;
}

export function generateInteger(min = 0, max = 10) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}