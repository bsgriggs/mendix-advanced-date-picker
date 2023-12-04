import { ReactElement, createElement } from "react";
import DatePicker from "./components/DatePicker";
import { ReactDatePickerPreviewProps } from "../typings/ReactDatePickerProps";
import { getDisplayName } from "./ReactDatePicker.editorConfig";

export function preview(props: ReactDatePickerPreviewProps): ReactElement {
    return (
        <DatePicker
            {...props}
            id=""
            tabIndex={0}
            date={null}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            setDate={() => {}}
            readonly={false}
            icon={props.customIcon || { type: "glyph", iconClass: "glyphicon-calendar" }}
            placeholder={getDisplayName(props)}
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
            startDate={null}
            endDate={null}
            open={false}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            setOpen={() => {}}
            customChildren={undefined}
            monthsToDisplay={1}
            timeInterval={15}
            specificTimes={[]}
            openToDate={undefined}
            showPreviousMonths={false}
            showInline={false}
            clearable={props.clearable !== "false"}
            firstDayOfWeek={0}
            language={"en-US"}
            dateFormat={"MM/dd/yyyy"}
        />
    );
}

export function getPreviewCss(): string {
    return require("./ui/ReactDatePicker.scss");
}
