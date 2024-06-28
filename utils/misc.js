export function isNullish(value) {
    if (typeof value === "object" && value !== null) {
        return Object.keys(value).length === 0;
    }
    if (Array.isArray(value)) {
        return value.length === 0;
    }

    return value === null || value === undefined || value === "" || !value;
}

export function exists(value) {
    return !isNullish(value);
}