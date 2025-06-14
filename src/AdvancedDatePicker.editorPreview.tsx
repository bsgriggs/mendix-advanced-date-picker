import { ReactElement, createElement } from "react";
import DatePicker from "./components/DatePicker";
import { AdvancedDatePickerPreviewProps } from "../typings/AdvancedDatePickerProps";
import { getDisplayName } from "./AdvancedDatePicker.editorConfig";

export function preview(props: AdvancedDatePickerPreviewProps): ReactElement {
    return (
        <DatePicker
            {...props}
            id=""
            tabIndex={0}
            dateFormatEnum={props.dateFormat}
            showFullMonthYearPicker={props.dateFormat === "MONTH" && props.monthFormat === "FULL"}
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
            invalid={false}
            required={false}
            includeInvalidChar={false}
        />
    );
}

export function getPreviewCss(): string {
    return require("./ui/AdvancedDatePicker.scss");
}
