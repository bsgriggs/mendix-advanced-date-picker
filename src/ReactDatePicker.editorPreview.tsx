import { ReactElement, createElement } from "react";
import DatePicker from "./components/DatePicker";
import { ReactDatePickerPreviewProps } from "../typings/ReactDatePickerProps";

export function preview(props: ReactDatePickerPreviewProps): ReactElement {
    return (
        <DatePicker
            id=""
            tabIndex={0}
            date={new Date()}
            setDate={() => {}}
            readonly={false}
            icon={props.icon || { type: "glyph", iconClass: "glyphicon-calendar" }}
            placeholder={""}
            minDate={undefined}
            maxDate={undefined}
            disableDateMode={"OFF"}
            disabledDays={[]}
            disableSunday={false}
            disableMonday={false}
            disableTuesday={false}
            disableWednesday={false}
            disableThursday={false}
            disableFriday={false}
            disableSaturday={false}
            selectionType={props.selectionType}
            startDate={new Date()}
            endDate={new Date()}
            open={false}
            setOpen={() => {}}
            showTodayButton={true}
            todayButtonText=""
            customChildren={undefined}
            clearable
            monthsToDisplay={1}
        />
    );
}

export function getPreviewCss(): string {
    return require("./ui/ReactDatePicker.scss");
}
