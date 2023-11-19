import { ReactElement, createElement, Fragment, useMemo, useCallback, useState, useEffect } from "react";
import DatePicker from "./components/DatePicker";
import { ReactDatePickerContainerProps } from "../typings/ReactDatePickerProps";
import { attribute, literal, greaterThanOrEqual, lessThanOrEqual, and } from "mendix/filters/builders";

import "./ui/ReactDatePicker.scss";
import { Alert } from "./components/Alert";

export function ReactDatePicker(props: ReactDatePickerContainerProps): ReactElement {
    const [open, setOpen] = useState(false);
    const [placeholder, setPlaceholder] = useState("");

    //Seperated so the placeholder can be set to the current value if props.clearable is off
    useEffect(() => setPlaceholder(props.placeholder?.value || ""), [props.placeholder]);

    //Ensure the list of specific days is only retrieved if the menu is open and only get days inside the min/max range
    useEffect(() => {
        if (props.specificDaysMode !== "OFF") {
            props.specificDaysDatasource.setLimit(open || props.showInline ? Infinity : 0);
            if (props.minDate || props.maxDate) {
                const filter = [];
                if (props.minDate?.value !== undefined) {
                    filter.push(
                        greaterThanOrEqual(attribute(props.specificDaysAttribute.id), literal(props.minDate.value))
                    );
                }
                if (props.maxDate?.value !== undefined) {
                    filter.push(
                        lessThanOrEqual(attribute(props.specificDaysAttribute.id), literal(props.maxDate.value))
                    );
                }
                props.specificDaysDatasource.setFilter(filter.length > 1 ? and(...filter) : filter[0]);
            }
        }
    }, [open, props.showInline]);

    const specificDays = useMemo(
        () => props.specificDaysDatasource?.items?.map(obj => props.specificDaysAttribute.get(obj).value as Date),
        [props.specificDaysDatasource, props.specificDaysAttribute]
    );

    //Ensure the list of interval days is only retrieved if the menu is open and only get days inside the min/max range
    useEffect(() => {
        if (props.intervalDaysMode !== "OFF") {
            props.intervalDaysDatasource.setLimit(open || props.showInline ? Infinity : 0);
            if (props.minDate || props.maxDate) {
                const filter = [];
                if (props.minDate?.value !== undefined) {
                    filter.push(
                        greaterThanOrEqual(attribute(props.intervalDaysStart.id), literal(props.minDate.value))
                    );
                }
                if (props.maxDate?.value !== undefined) {
                    filter.push(lessThanOrEqual(attribute(props.intervalDaysEnd.id), literal(props.maxDate.value)));
                }
                props.intervalDaysDatasource.setFilter(filter.length > 1 ? and(...filter) : filter[0]);
            }
        }
    }, [open, props.showInline]);

    const intervalDays = useMemo(
        () =>
            props.intervalDaysDatasource?.items?.map(obj => ({
                start: props.intervalDaysStart.get(obj).value as Date,
                end: props.intervalDaysEnd.get(obj).value as Date
            })),
        [props.intervalDaysDatasource, props.intervalDaysStart, props.intervalDaysEnd]
    );

    //Focus and blur events
    useEffect(() => (open ? props.onEnter?.execute() : props.onLeave?.execute()), [open]);

    const monthsToDisplay = useMemo(() => {
        const propMonthsToDisplay = Number(props.monthsToDisplay.value);
        return propMonthsToDisplay > 0 ? propMonthsToDisplay : 1;
    }, [props.monthsToDisplay]);

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
            } else if (props.clearable.value === true) {
                props.dateAttribute?.setValue(undefined);
            } else {
                setPlaceholder(props.dateAttribute?.displayValue);
            }
        },
        [props.dateAttribute, props.startDateAttribute, props.endDateAttribute]
    );

    return (
        <Fragment>
            <DatePicker
                {...props}
                tabIndex={props.tabIndex || 0}
                placeholder={placeholder}
                date={props.dateAttribute?.value ? (props.dateAttribute.value as Date) : null}
                startDate={props.startDateAttribute?.value ? (props.startDateAttribute.value as Date) : null}
                endDate={props.endDateAttribute?.value ? (props.endDateAttribute.value as Date) : null}
                setDate={onChangeHandler}
                readonly={
                    props.selectionType === "SINGLE"
                        ? props.dateAttribute.readOnly
                        : props.startDateAttribute.readOnly || props.endDateAttribute.readOnly
                }
                icon={props.icon?.value || { type: "glyph", iconClass: "glyphicon-calendar" }}
                minDate={props.minDate?.value}
                maxDate={props.maxDate?.value}
                specificDays={specificDays || []}
                intervalDays={intervalDays || []}
                disableSunday={props.disableSunday.value === true}
                disableMonday={props.disableMonday.value === true}
                disableTuesday={props.disableTuesday.value === true}
                disableWednesday={props.disableWednesday.value === true}
                disableThursday={props.disableThursday.value === true}
                disableFriday={props.disableFriday.value === true}
                disableSaturday={props.disableSaturday.value === true}
                open={open}
                setOpen={setOpen}
                showTodayButton={props.showTodayButton.value === true}
                todayButtonText={props.todayButtonText?.value || ""}
                customChildren={props.useCustomChildren && props.customChildren}
                clearable={props.clearable.value === true || props.selectionType === "MULTI"}
                monthsToDisplay={monthsToDisplay}
                showWeekNumbers={props.showWeekNumbers.value === true}
                showPreviousMonths={props.showPreviousMonth.value === true}
                showInline={props.showInline.value === true}
            />
            {props.dateAttribute?.validation && <Alert>{props.dateAttribute.validation}</Alert>}
            {props.startDateAttribute?.validation && <Alert>{props.startDateAttribute.validation}</Alert>}
            {props.endDateAttribute?.validation && <Alert>{props.endDateAttribute.validation}</Alert>}
        </Fragment>
    );
}
