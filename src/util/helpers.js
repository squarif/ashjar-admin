export function getDate(value) {
    if (typeof value === "string") {
        if (value.includes("-")) {
            return value;
        } else {
            const date = new Date(parseInt(value));
            return date.toISOString().slice(0, 10);
        }
    } else {
        return value;
    }
}
