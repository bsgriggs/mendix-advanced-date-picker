import { ReactElement, createElement, useCallback, useRef, ReactNode, useMemo, useEffect } from "react";
import DatePicker, { DatePickerProps as RDPProps } from "react-datepicker";
import { WebIcon } from "mendix";
import { Icon } from "mendix/components/web/Icon";
import classNames from "classnames";
import {
    IntervalDaysModeEnum,
    SpecificDaysModeEnum,
    SelectionTypeEnum,
    SpecificTimesModeEnum,
    AlignmentEnum,
    DateFormatEnum
} from "../../typings/AdvancedDatePickerProps";
import ContainsTime from "../utils/ContainsTime";
import TimeMatch from "../utils/TimeMatch";
import ExtractTimeFormat from "../utils/ExtractTimeFormat";
import DayOfWeekSelectable from "../utils/DayOfWeekSelectable";
import RemoveTime from "../utils/RemoveTime";
import CustomHeader from "./CustomHeader";
import ContainsDate from "src/utils/ContainsDate";
import { IMask } from "./IMask";
import { Day } from "date-fns";

interface DatePickerProps {
    // System
    id: string;
    tabIndex: number;
    open: boolean;
    setOpen: (newOpen: boolean) => void;
    // General
    placeholder: string;
    dateFormatEnum: DateFormatEnum;
    timeInterval: number;
    timeCaption: string;
    selectionType: SelectionTypeEnum;
    date: Date | null;
    setDate: (newDate: Date | [Date | null, Date | null] | null) => void;
    startDate: Date | null;
    endDate: Date | null;
    readonly: boolean;
    // Selectable Dates
    minDate: Date | undefined;
    maxDate: Date | undefined;
    specificDaysMode: SpecificDaysModeEnum;
    specificDays: Date[];
    intervalDaysMode: IntervalDaysModeEnum;
    intervalDays: Array<{ start: Date; end: Date }>;
    disableSunday: boolean;
    disableMonday: boolean;
    disableTuesday: boolean;
    disableWednesday: boolean;
    disableThursday: boolean;
    disableFriday: boolean;
    disableSaturday: boolean;
    // Selectable Times
    minTime: Date | undefined;
    maxTime: Date | undefined;
    specificTimesMode: SpecificTimesModeEnum;
    specificTimes: Date[];
    // Customization
    showIcon: boolean;
    showIconInside: boolean;
    icon: WebIcon;
    showTodayButton: boolean;
    todayButtonText: string;
    monthsToDisplay: number;
    showWeekNumbers: boolean;
    showPreviousMonths: boolean;
    showArrow: boolean;
    showInline: boolean;
    alignment: AlignmentEnum;
    customChildren: ReactNode | undefined;
    clearable: boolean;
    openToDate: Date | undefined;
    maskInput: boolean;
    maskErrorText: string | undefined;
    includeInvalidChar: boolean;
    // Accessibility
    required: boolean;
    calendarIconLabel: string;
    navigateButtonPrefix: string;
    selectPrefix: string;
    weekPrefix: string;
    monthPrefix: string;
    monthSelectLabel: string;
    yearSelectLabel: string;
    disabledLabel: string;
    clearButtonLabel: string;
    // MxDate Meta Data
    invalid: boolean;
    firstDayOfWeek: number;
    dateFormat: string; // text format (i.e. MM/dd/yyyy)
    language: string;
}

const DatePickerComp = (props: DatePickerProps): ReactElement => {
    const ref = useRef<HTMLDivElement>(null);
    const toggleBtnRef = useRef<HTMLButtonElement>(null);
    const firstBtnRef = useRef<HTMLButtonElement>(null);
    const showTimeSelect = useMemo(
        () =>
            props.dateFormatEnum === "TIME" ||
            props.dateFormatEnum === "DATETIME" ||
            (props.dateFormatEnum === "CUSTOM" && ContainsTime(props.dateFormat)),
        [props.dateFormatEnum, props.dateFormat]
    );

    const focusInput = useCallback(() => {
        setTimeout(
            () => (!props.showInline ? (document.getElementById(props.id) as HTMLInputElement)?.focus() : undefined),
            100
        );
    }, [props.id, props.showInline]);

    const focusFirstBtn = useCallback(() => {
        setTimeout(() => {
            firstBtnRef.current?.focus();
        }, 100);
    }, [firstBtnRef]);

    const handleOnChange = useCallback(
        (date: Date | [Date | null, Date | null] | null) => {
            if (props.selectionType === "SINGLE") {
                if (
                    (props.dateFormatEnum !== "DATETIME" && props.dateFormatEnum !== "CUSTOM") ||
                    (props.dateFormatEnum === "CUSTOM" && !showTimeSelect) || // custom but no time component
                    (showTimeSelect &&
                        date !== null &&
                        props.date !== null &&
                        !Array.isArray(date) &&
                        !TimeMatch(date, props.date)) // Time selected
                ) {
                    // if not date & time picker, close the popper
                    // if date & time picker, close the popper when the time is selected
                    props.setOpen(false);
                    focusInput();
                }
            } else if (props.startDate !== null && props.endDate === null) {
                // if multi, close the popper when the end date is selected
                props.setOpen(false);
                focusInput();
            }
            props.setDate(date);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [props.date, props.startDate, showTimeSelect, focusInput, props.setDate]
    );

    // A11y fixes
    useEffect(() => {
        if (props.date || props.startDate || props.endDate) {
            setTimeout(() => {
                // make the clear button focus-able
                const clearButton = ref.current?.querySelector(".react-datepicker__close-icon");
                clearButton?.setAttribute("tabIndex", `${props.tabIndex}`);
                // make the clear button's aria label match the title
                clearButton?.setAttribute("aria-label", `${props.clearButtonLabel}`);
            }, 100);
        }
    }, [props.date, props.startDate, props.endDate, props.tabIndex, props.clearButtonLabel]);

    const timeOnly = useMemo(
        () => props.dateFormatEnum === "TIME" || (props.dateFormatEnum === "CUSTOM" && !ContainsDate(props.dateFormat)),
        [props.dateFormat, props.dateFormatEnum]
    );

    const todayIsSelectable = useMemo(() => {
        const today = RemoveTime(new Date());
        if (props.minDate && today < RemoveTime(props.minDate as Date)) {
            return false;
        } else if (props.maxDate && today > RemoveTime(props.maxDate as Date)) {
            return false;
        } else if (
            props.specificDays &&
            props.specificDaysMode === "EXCLUDE" &&
            props.specificDays.find(value => value.getTime() === today.getTime())
        ) {
            return false;
        } else if (
            props.intervalDays &&
            props.intervalDaysMode === "EXCLUDE" &&
            props.intervalDays.find(value => value.start <= today && value.end >= today)
        ) {
            return false;
        } else if (
            !DayOfWeekSelectable(
                today,
                props.disableSunday,
                props.disableMonday,
                props.disableTuesday,
                props.disableWednesday,
                props.disableThursday,
                props.disableFriday,
                props.disableSaturday
            )
        ) {
            return false;
        } else if (
            (props.specificDays &&
                props.specificDaysMode === "INCLUDE" &&
                props.specificDays.find(value => value.getTime() === today.getTime())) ||
            (props.intervalDays &&
                props.intervalDaysMode === "INCLUDE" &&
                props.intervalDays.find(value => value.start <= today && value.end >= today))
        ) {
            return true;
        } else if (
            (props.specificDays && props.specificDaysMode === "INCLUDE") ||
            (props.intervalDays && props.intervalDaysMode === "INCLUDE")
        ) {
            return false;
        } else {
            return true;
        }
    }, [
        props.minDate,
        props.maxDate,
        props.specificDays,
        props.intervalDays,
        props.specificDaysMode,
        props.intervalDaysMode,
        props.disableSaturday,
        props.disableMonday,
        props.disableTuesday,
        props.disableWednesday,
        props.disableThursday,
        props.disableFriday,
        props.disableSunday
    ]);

    const todayButton = props.dateFormatEnum !== "MONTH" &&
        props.dateFormatEnum !== "YEAR" &&
        props.dateFormatEnum !== "TIME" &&
        props.dateFormatEnum !== "QUARTER" &&
        props.showTodayButton &&
        todayIsSelectable &&
        !timeOnly && (
            <button
                className="btn btn-default btn-block today-button"
                aria-label={props.selectPrefix + " " + props.todayButtonText}
                tabIndex={props.tabIndex}
                disabled={props.readonly}
                onClick={() => handleOnChange(RemoveTime(new Date()))}
            >
                {props.todayButtonText}
            </button>
        );

    const commonProps: RDPProps = {
        id: props.id,
        tabIndex: props.tabIndex,
        allowSameDay: false,
        ariaLabelledBy: `${props.id}-label`,
        autoFocus: false,
        calendarStartDay: props.firstDayOfWeek as Day,
        className: "form-control",
        dateFormat: props.dateFormat,
        timeFormat: showTimeSelect ? ExtractTimeFormat(props.dateFormat) : undefined,
        disabled: props.readonly,
        disabledKeyboardNavigation: false,
        dropdownMode: "select",
        locale: props.language,
        placeholderText: !props.readonly ? props.placeholder : "",
        popperPlacement:
            props.alignment === "LEFT" ? "bottom-start" : props.alignment === "RIGHT" ? "bottom-end" : undefined,
        popperProps: {
            strategy: "fixed"
        },
        readOnly: props.readonly,
        showPopperArrow: props.showArrow,
        // strictParsing={props.maskInput}
        useWeekdaysShort: false,
        minDate: props.minDate,
        maxDate: props.maxDate,
        minTime: props.minTime,
        maxTime: props.maxTime,
        includeDates: props.specificDaysMode === "INCLUDE" ? props.specificDays : undefined,
        excludeDates: props.specificDaysMode === "EXCLUDE" ? props.specificDays : undefined,
        includeTimes: props.specificTimesMode === "INCLUDE" ? props.specificTimes : undefined,
        excludeTimes: props.specificTimesMode === "EXCLUDE" ? props.specificTimes : undefined,
        includeDateIntervals: props.intervalDaysMode === "INCLUDE" ? props.intervalDays : undefined,
        excludeDateIntervals: props.intervalDaysMode === "EXCLUDE" ? props.intervalDays : undefined,
        filterDate: date =>
            DayOfWeekSelectable(
                date,
                props.disableSunday,
                props.disableMonday,
                props.disableTuesday,
                props.disableWednesday,
                props.disableThursday,
                props.disableFriday,
                props.disableSaturday
            ),
        open: props.open,
        onInputClick: () => props.setOpen(true),
        onClickOutside: event => {
            if (toggleBtnRef.current?.contains(event.target as Node)) {
                return;
            }
            props.setOpen(false);
        },
        onKeyDown: event => {
            switch (event.key) {
                case " ":
                    if (!props.open) {
                        event.preventDefault();
                        props.setOpen(true);
                        focusFirstBtn();
                    }
                    break;
                case "Escape":
                    props.setOpen(false);
                    focusInput();
                    break;
            }
        },
        isClearable: props.clearable,
        monthsShown: props.monthsToDisplay,
        showWeekNumbers: props.showWeekNumbers,
        showPreviousMonths: props.showPreviousMonths,
        inline: props.showInline,
        showMonthYearPicker: props.dateFormatEnum === "MONTH",
        showQuarterYearPicker: props.dateFormatEnum === "QUARTER",
        showYearPicker: props.dateFormatEnum === "YEAR",
        showTimeSelect,
        showTimeSelectOnly: timeOnly,
        timeIntervals: props.timeInterval,
        timeCaption: props.timeCaption,
        openToDate: props.openToDate,
        autoComplete: "off",
        customInput: props.maskInput ? (
            <IMask
                id={props.id + "_mask"}
                tabIndex={props.tabIndex}
                date={props.date}
                setDate={(newDate: Date | null) => props.setDate(newDate)}
                format={props.dateFormat}
                readOnly={props.readonly}
                placeholder={!props.readonly ? props.placeholder : ""}
                maskErrorText={props.maskErrorText}
                includeInvalidChar={props.includeInvalidChar}
            />
        ) : undefined,

        renderCustomHeader: params => <CustomHeader {...props} ref={firstBtnRef} {...params} focusInput={focusInput} />,
        ariaInvalid: props.invalid ? "true" : "false",
        ariaRequired: props.required ? "true" : "false",
        chooseDayAriaLabelPrefix: props.selectPrefix,
        monthAriaLabelPrefix: props.monthPrefix,
        weekAriaLabelPrefix: props.weekPrefix,
        disabledDayAriaLabelPrefix: props.disabledLabel,
        clearButtonTitle: props.clearButtonLabel
    };

    return (
        <div
            className={classNames(
                "mendix-advanced-datepicker",
                { "icon-inside": props.showIconInside },
                { "date-and-time": showTimeSelect && !timeOnly }
            )}
            ref={ref}
            onKeyDown={event => {
                if (event.key === "Tab") {
                    setTimeout(() => {
                        if (ref.current && !ref.current.contains(document.activeElement)) {
                            props.setOpen(false);
                        }
                    }, 100);
                }
            }}
        >
            {/* really dumb format because library's typing doesn't allow overloading props */}
            {props.selectionType === "SINGLE" ? (
                <DatePicker {...commonProps} selected={props.date} onChange={handleOnChange}>
                    {todayButton}
                    {props.customChildren}
                </DatePicker>
            ) : (
                <DatePicker
                    {...commonProps}
                    selectsRange
                    startDate={props.startDate || undefined}
                    endDate={props.endDate || undefined}
                    onChange={handleOnChange}
                >
                    {todayButton}
                    {props.customChildren}
                </DatePicker>
            )}

            {!props.showInline && props.showIcon && (
                <button
                    title={props.calendarIconLabel}
                    aria-label={props.calendarIconLabel}
                    aria-controls={props.id}
                    disabled={props.readonly}
                    aria-haspopup
                    ref={toggleBtnRef}
                    className="btn btn-default btn-calendar spacing-outer-left"
                    onClick={() => {
                        if (props.open) {
                            setTimeout(() => toggleBtnRef.current?.focus(), 100);
                        } else {
                            focusFirstBtn();
                        }
                        props.setOpen(!props.open);
                    }}
                    tabIndex={!props.showIconInside ? props.tabIndex : -1}
                >
                    {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment 
                    @ts-ignore */}
                    <Icon icon={props.icon} />
                </button>
            )}
        </div>
    );
};

export default DatePickerComp;
