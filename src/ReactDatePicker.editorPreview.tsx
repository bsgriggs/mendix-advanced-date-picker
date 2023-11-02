import { ReactElement, createElement } from "react";
import DatePicker from "./components/DatePicker";
import { ReactDatePickerPreviewProps } from "../typings/ReactDatePickerProps";

export function preview(props: ReactDatePickerPreviewProps): ReactElement {
    return (
        <DatePicker
            id=""
            date={new Date()}
            setDate={() => {}}
            readonly={false}
            icon={props.icon || { type: "glyph", iconClass: "glyphicon-calendar" }}
            placeholder={""}
        />
    );
}

export function getPreviewCss(): string {
    return require("./ui/ReactDatePicker.css");
}
