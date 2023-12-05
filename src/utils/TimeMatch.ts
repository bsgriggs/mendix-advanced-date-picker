const TimeMatch = (date1: Date, date2: Date): boolean =>
    date1.getUTCHours() === date2.getUTCHours() &&
    date1.getUTCMinutes() === date2.getUTCMinutes() &&
    date1.getUTCSeconds() === date2.getUTCSeconds() &&
    date1.getUTCMilliseconds() === date2.getUTCMilliseconds();

export default TimeMatch;
