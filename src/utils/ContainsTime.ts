const ContainsTime = (dateFormat: string): boolean =>
    dateFormat !== undefined &&
    (dateFormat.includes("H") ||
        dateFormat.includes("h") ||
        dateFormat.includes("m") ||
        dateFormat.includes("s") ||
        dateFormat.includes("z") ||
        dateFormat.includes("a"));

export default ContainsTime;
