import { ReactElement, createElement, Fragment } from "react";
import DatePicker from "./components/DatePicker";
import { ReactDatePickerContainerProps } from "../typings/ReactDatePickerProps";

import "./ui/ReactDatePicker.css";
import { Alert } from "./components/Alert";

export function ReactDatePicker(props: ReactDatePickerContainerProps): ReactElement {
    return (
        <Fragment>
            <DatePicker
                id={props.id}
                placeholder={props.placeholder?.value as string}
                date={props.dateAttribute.value ? (props.dateAttribute.value as Date) : null}
                setDate={newDate => props.dateAttribute.setValue(newDate !== null ? newDate : undefined)}
                readonly={props.dateAttribute.readOnly}
                icon={props.icon?.value || { type: "glyph", iconClass: "glyphicon-calendar" }}
            />
            {props.dateAttribute.validation && <Alert>{props.dateAttribute.validation}</Alert>}
        </Fragment>
    );
}
