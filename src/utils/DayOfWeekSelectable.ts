const DayOfWeekSelectable = (
    date: Date,
    disableSunday: boolean,
    disableMonday: boolean,
    disableTuesday: boolean,
    disableWednesday: boolean,
    disableThursday: boolean,
    disableFriday: boolean,
    disableSaturday: boolean
): boolean =>
    (!disableSunday && date.getDay() === 0) ||
    (!disableMonday && date.getDay() === 1) ||
    (!disableTuesday && date.getDay() === 2) ||
    (!disableWednesday && date.getDay() === 3) ||
    (!disableThursday && date.getDay() === 4) ||
    (!disableFriday && date.getDay() === 5) ||
    (!disableSaturday && date.getDay() === 6);

export default DayOfWeekSelectable;
