import { ReactElement, createElement } from "react";
import DatePicker from "./components/DatePicker";
import { ReactDatePickerPreviewProps } from "../typings/ReactDatePickerProps";

export function preview(props: ReactDatePickerPreviewProps): ReactElement {
    return (
        <DatePicker
            {...props}
            id=""
            tabIndex={0}
            date={new Date()}
            setDate={() => {}}
            readonly={false}
            icon={props.icon || { type: "glyph", iconClass: "glyphicon-calendar" }}
            placeholder={""}
            minDate={undefined}
            maxDate={undefined}
            minTime={undefined}
            maxTime={undefined}
            specificDays={[]}
            intervalDays={[]}
            disableSunday={false}
            disableMonday={false}
            disableTuesday={false}
            disableWednesday={false}
            disableThursday={false}
            disableFriday={false}
            disableSaturday={false}
            startDate={new Date()}
            endDate={new Date()}
            open={false}
            setOpen={() => {}}
            showTodayButton={true}
            todayButtonText=""
            customChildren={undefined}
            clearable
            monthsToDisplay={1}
            showWeekNumbers
            showPreviousMonths
            showArrow
            showInline={false}
            timeInterval={15}
            specificTimes={[]}
        />
    );
}

export function getPreviewCss(): string {
    return require("./ui/ReactDatePicker.scss");
}
