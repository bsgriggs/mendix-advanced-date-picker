const ExtractTimeFormat = (dateFormat: string): string => {
    const index = dateFormat.includes("H") ? dateFormat.indexOf("H") : dateFormat.indexOf("h");
    let TimeFormat = dateFormat.substring(index).replaceAll("s", "");
    const colonCheck = TimeFormat.lastIndexOf(":");
    if (TimeFormat.charAt(colonCheck + 1) === " ") {
        // if there is a remaining colon, remove it
        TimeFormat = TimeFormat.substring(0, colonCheck) + TimeFormat.substring(colonCheck + 1);
    }
    return TimeFormat;
};

export default ExtractTimeFormat;
