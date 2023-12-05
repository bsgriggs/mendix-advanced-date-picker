import { ReactElement, createElement, Fragment, useMemo, useCallback, useState, useEffect } from "react";
import DatePicker from "./components/DatePicker";
import { ReactDatePickerContainerProps } from "../typings/ReactDatePickerProps";
import { attribute, literal, greaterThanOrEqual, lessThanOrEqual, and } from "mendix/filters/builders";
import ContainsTime from "./utils/ContainsTime";
import "./ui/ReactDatePicker.scss";
import { Alert } from "./components/Alert";
import * as locales from "date-fns/locale";
import { registerLocale } from "react-datepicker";
import MxFormatter from "./utils/MxFormatter";

interface Locale {
    [key: string]: object;
}

export function ReactDatePicker(props: ReactDatePickerContainerProps): ReactElement {
    const [open, setOpen] = useState(false);
    const [placeholder, setPlaceholder] = useState("");

    /* eslint-disable */
    // @ts-ignore
    const { languageTag = "en-US", patterns, firstDayOfWeek } = window.mx.session.getConfig().locale;
    /* eslint-enable */
    const [language] = useMemo(() => {
        const language = languageTag.split("-");
        const languageTagWithoutDash = languageTag.replace("-", "");
        if (languageTagWithoutDash in locales) {
            registerLocale(language, (locales as Locale)[languageTagWithoutDash]);
        } else if (language in locales) {
            registerLocale(language, (locales as Locale)[language]);
        }
        return language;
    }, [languageTag]);

    const dateFormat: string = useMemo(
        () =>
            props.dateFormat === "DATE"
                ? patterns.date
                : props.dateFormat === "DATETIME"
                ? patterns.datetime
                : props.dateFormat === "TIME"
                ? patterns.time
                : props.dateFormat === "YEAR"
                ? "yyyy"
                : props.dateFormat === "MONTH"
                ? props.maskInput
                    ? "MMM yyyy"
                    : "MMMM yyyy"
                : props.dateFormat === "QUARTER"
                ? "yyyy QQQ"
                : props.customDateFormat.value,
        [props.dateFormat, props.customDateFormat, patterns, props.maskInput]
    );

    // Seperated so the placeholder can be set to the current value if props.clearable is off
    useEffect(
        () =>
            setPlaceholder(
                props.placeholder && props.placeholder.value?.trim() !== ""
                    ? (props.placeholder.value as string)
                    : dateFormat.replace(/a/, "AM/PM")
            ),
        [props.placeholder, dateFormat]
    );

    // Ensure the list of interval days is only retrieved if the menu is open and only get days inside the min/max range
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, props.showInline, props.intervalDaysEnd, props.intervalDaysStart, props.minDate, props.maxDate]);

    const intervalDays = useMemo(
        () =>
            props.intervalDaysDatasource?.items?.map(obj => ({
                start: props.intervalDaysStart.get(obj).value as Date,
                end: props.intervalDaysEnd.get(obj).value as Date
            })),
        [props.intervalDaysDatasource, props.intervalDaysStart, props.intervalDaysEnd]
    );

    // Ensure the list of specific days is only retrieved if the menu is open and only get days inside the min/max range
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, props.showInline, props.minDate, props.maxDate, props.specificDaysAttribute]);

    const specificDays = useMemo(
        () => props.specificDaysDatasource?.items?.map(obj => props.specificDaysAttribute.get(obj).value as Date),
        [props.specificDaysDatasource, props.specificDaysAttribute]
    );

    // Ensure the list of specific times is only retrieved if the menu is open and only get days inside the min/max range
    useEffect(() => {
        if (props.specificTimesMode !== "OFF") {
            props.specificTimesDatasource.setLimit(open || props.showInline ? Infinity : 0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, props.showInline]);

    const specificTimes = useMemo(
        () => props.specificTimesDatasource?.items?.map(obj => props.specificTimeAttribute.get(obj).value as Date),
        [props.specificTimesDatasource, props.specificTimeAttribute]
    );

    // Focus and blur events
    useEffect(
        () => (open ? props.onEnter?.execute() : props.onLeave?.execute()),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [open]
    );

    const monthsToDisplay = useMemo(() => {
        const propMonthsToDisplay = Number(props.monthsToDisplay.value);
        return propMonthsToDisplay > 0 ? propMonthsToDisplay : 1;
    }, [props.monthsToDisplay]);

    const onChangeHandler = useCallback(
        (newDate: Date | [Date | null, Date | null] | null) => {
            if (newDate !== null) {
                if (Array.isArray(newDate)) {
                    // is Selection Type Multi
                    props.startDateAttribute.setValue(newDate[0] || undefined);
                    props.endDateAttribute.setValue(newDate[1] || undefined);
                } else {
                    props.dateAttribute.setValue(newDate);
                }
            } else if (props.clearable.value === true) {
                props.dateAttribute?.setValue(undefined);
            } else if (props.selectionType === "SINGLE") {
                // Set the placeholder to the text of the current value, so it does not appear cleared
                setPlaceholder(MxFormatter(props.dateAttribute.value as Date, dateFormat));
            }
        },
        [
            props.dateAttribute,
            props.startDateAttribute,
            props.endDateAttribute,
            props.clearable,
            dateFormat,
            props.selectionType
        ]
    );

    return (
        <Fragment>
            <DatePicker
                {...props}
                tabIndex={props.tabIndex || 0}
                placeholder={placeholder}
                dateFormatEnum={props.dateFormat}
                date={props.dateAttribute?.value ? (props.dateAttribute.value as Date) : null}
                startDate={props.startDateAttribute?.value ? (props.startDateAttribute.value as Date) : null}
                endDate={props.endDateAttribute?.value ? (props.endDateAttribute.value as Date) : null}
                setDate={onChangeHandler}
                readonly={
                    props.selectionType === "SINGLE"
                        ? props.dateAttribute.readOnly
                        : props.startDateAttribute.readOnly || props.endDateAttribute.readOnly
                }
                icon={props.customIcon?.value || { type: "glyph", iconClass: "glyphicon-calendar" }}
                minDate={props.minDate?.value}
                maxDate={props.maxDate?.value}
                minTime={props.minTime?.value}
                maxTime={props.maxTime?.value}
                specificDays={specificDays || []}
                specificTimes={specificTimes || []}
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
                showTodayButton={
                    props.dateFormat !== "MONTH" &&
                    props.dateFormat !== "YEAR" &&
                    props.dateFormat !== "TIME" &&
                    props.dateFormat !== "QUARTER" &&
                    props.showTodayButton
                }
                todayButtonText={props.todayButtonText?.value || ""}
                customChildren={props.useCustomContent && props.customContent}
                clearable={props.clearable.value === true || props.selectionType === "MULTI"}
                monthsToDisplay={monthsToDisplay}
                showWeekNumbers={props.showWeekNumbers}
                showPreviousMonths={props.showPreviousMonth.value === true}
                showInline={props.showInline.value === true}
                timeInterval={Number(props.timeInterval.value)}
                timeCaption={props.timeCaption.value as string}
                openToDate={props.openToDate?.value as Date}
                firstDayOfWeek={firstDayOfWeek}
                language={language}
                dateFormat={dateFormat}
                triggerButtonCaption={props.triggerButtonCaption.value as string}
                monthDropdownCaption={props.monthDropdownCaption.value as string}
                yearDropdownCaption={props.yearDropdownCaption.value as string}
            />
            {props.dateAttribute?.validation && <Alert>{props.dateAttribute.validation}</Alert>}
            {props.startDateAttribute?.validation && <Alert>{props.startDateAttribute.validation}</Alert>}
            {props.endDateAttribute?.validation && <Alert>{props.endDateAttribute.validation}</Alert>}
            {props.selectionType === "MULTI" &&
                props.dateFormat === "CUSTOM" &&
                ContainsTime(props.customDateFormat.value as string) && (
                    <Alert>Multi selection is not supported if the widget can select time</Alert>
                )}
        </Fragment>
    );
}
