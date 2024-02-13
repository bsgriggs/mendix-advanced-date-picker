const MapMask = (dateFormat: string): Array<RegExp | string> => {
    const newMask: Array<RegExp | string> = [];
    dateFormat.split("").forEach(value => {
        if (value === "d" || value === "y" || value === "h" || value === "H" || value === "m" || value === "s") {
            newMask.push(/\d/);
        } else if (value === "M") {
            const numberOfMonthDigits = dateFormat.match(/M/g);
            if (numberOfMonthDigits) {
                if (numberOfMonthDigits.length > 2) {
                    newMask.push(/[A-Za-z]/);
                } else {
                    newMask.push(/\d/);
                }
            }
        } else if (value === "a") {
            newMask.push(/[A-Z]/);
            newMask.push("M");
        } else {
            newMask.push(value);
        }
    });
    return newMask;
};

export default MapMask;
