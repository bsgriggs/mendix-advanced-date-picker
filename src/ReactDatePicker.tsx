import { ReactElement, createElement, Fragment, useMemo, useCallback } from "react";
import DatePicker from "./components/DatePicker";
import { ReactDatePickerContainerProps } from "../typings/ReactDatePickerProps";

import "./ui/ReactDatePicker.scss";
import { Alert } from "./components/Alert";

export function ReactDatePicker(props: ReactDatePickerContainerProps): ReactElement {
    const disabledDays = useMemo(
        () => props.disableDatesDatasource?.items?.map(obj => props.disableDatesAttribute?.get(obj).value as Date),
        [props.disableDatesDatasource, props.disableDatesAttribute]
    );

    const onChangeHandler = useCallback(
        (newDate: Date | [Date | null, Date | null] | null) => {
            if (newDate !== null) {
                if (Array.isArray(newDate)) {
                    //is Selection Type Multi
                    props.startDateAttribute.setValue(newDate[0] || undefined);
                    props.endDateAttribute.setValue(newDate[1] || undefined);
                } else {
                    props.dateAttribute.setValue(newDate);
                }
            } else {
                if (props.selectionType === "SINGLE") {
                    props.dateAttribute.setValue(undefined);
                } else {
                    props.startDateAttribute.setValue(undefined);
                    props.endDateAttribute.setValue(undefined);
                }
            }
        },
        [props.dateAttribute, props.startDateAttribute, props.endDateAttribute]
    );

    console.info(props.minDate?.value, props.maxDate?.value);

    return (
        <Fragment>
            <DatePicker
                {...props}
                tabIndex={props.tabIndex || 0}
                placeholder={props.placeholder?.value as string}
                date={props.dateAttribute?.value ? (props.dateAttribute.value as Date) : null}
                startDate={props.startDateAttribute?.value ? (props.startDateAttribute.value as Date) : null}
                endDate={props.endDateAttribute?.value ? (props.endDateAttribute.value as Date) : null}
                setDate={onChangeHandler}
                readonly={props.dateAttribute.readOnly}
                icon={props.icon?.value || { type: "glyph", iconClass: "glyphicon-calendar" }}
                minDate={props.minDate?.value}
                maxDate={props.maxDate?.value}
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

/* 
================
ToDo
================
- min max dates should apply filters on data source
- style icon properly
- On Calendar Open / Close (actions) (use with a state to only load data sources while open)
- on blur event (action)
- Children content (Widgets)
- Clearable (yes, style button; no, prevent keyboard clear)
- close on scroll (yes/no)
- option to show multiple months (int expression)
- custom date render? (copy from Jonny)
- custom date format (enum to set custom, text template)
- test range
- option to disable keyboard navigation (bool expression)
- option to display week numbers (bool expression)
- exclude/include date interval? data source with 2 date attrs
- pick month/full month/quarter/year (enum)
-- month columns 2->4
- month dropdown short or long
- highlight dates (data source with attr)
- holidays (data source with date and string attr) 
- inline - always show calendar instead of input (bool expression)
- show popper arrow (yes/no)
- open to date (date expression)
- portal version (yes/no)
- today button (yes/no)

- date time
- exclude/include time interval
- show time input (bool expression)

- time 
- exclude/include time interval
- show time input (bool expression)

*/
