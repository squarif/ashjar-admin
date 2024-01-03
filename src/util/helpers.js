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

export function getTime12Hour(time24) {
    // Split the time into hours and minutes
    const [hours, minutes] = time24.split(":").map(Number);

    // Check if the time is in the AM or PM
    const period = hours >= 12 ? "PM" : "AM";

    // Convert the hours to 12-hour format
    const hours12 = hours % 12 || 12;

    // Construct the 12-hour formatted time string
    const time12 = `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;

    return time12;
}
