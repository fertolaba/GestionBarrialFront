export function capitalizeFirstLetter(string) {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function truncateString(str, num = 25) {
    if (str.length <= num) {
        return str
    }
    return str.slice(0, num) + '...'
}