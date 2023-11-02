import { ReactElement, createElement, Fragment, useMemo } from "react";
import DatePicker from "./components/DatePicker";
import { ReactDatePickerContainerProps } from "../typings/ReactDatePickerProps";

import "./ui/ReactDatePicker.scss";
import { Alert } from "./components/Alert";

export function ReactDatePicker(props: ReactDatePickerContainerProps): ReactElement {
    const disabledDays = useMemo(
        () => props.disableDatesDatasource?.items?.map(obj => props.disableDatesAttribute?.get(obj).value as Date),
        [props.disableDatesDatasource, props.disableDatesAttribute]
    );

    return (
        <Fragment>
            <DatePicker
                id={props.id}
                placeholder={props.placeholder?.value as string}
                date={props.dateAttribute.value ? (props.dateAttribute.value as Date) : null}
                setDate={newDate => {
                    console.info(newDate);
                    props.dateAttribute.setValue(newDate !== null ? newDate : undefined);
                }}
                readonly={props.dateAttribute.readOnly}
                icon={props.icon?.value || { type: "glyph", iconClass: "glyphicon-calendar" }}
                minDate={props.minDate?.value}
                maxDate={props.maxDate?.value}
                disableDateMode={props.disableDateMode}
                disabledDays={disabledDays || []}
                disableSunday={props.disableSunday.value === true}
                disableMonday={props.disableMonday.value === true}
                disableTuesday={props.disableTuesday.value === true}
                disableWednesday={props.disableWednesday.value === true}
                disableThursday={props.disableThursday.value === true}
                disableFriday={props.disableFriday.value === true}
                disableSaturday={props.disableSaturday.value === true}
            />
            {props.dateAttribute.validation && <Alert>{props.dateAttribute.validation}</Alert>}
        </Fragment>
    );
}
