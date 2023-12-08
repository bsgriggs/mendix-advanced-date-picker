const ContainsDate = (dateFormat: string): boolean =>
    dateFormat.includes("y") ||
    dateFormat.includes("Y") ||
    dateFormat.includes("d") ||
    dateFormat.includes("D") ||
    dateFormat.includes("M");
export default ContainsDate;
