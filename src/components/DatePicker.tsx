import { ReactElement, createElement, useCallback, useRef, ReactNode, useMemo } from "react";
import DatePicker, { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import { WebIcon } from "mendix";
import { Icon } from "mendix/components/web/Icon";
import "react-datepicker/dist/react-datepicker.css";
import classNames from "classnames";
import {
    IntervalDaysModeEnum,
    SpecificDaysModeEnum,
    SelectionTypeEnum,
    SpecificTimesModeEnum,
    AlignmentEnum,
    DateFormatEnum
} from "typings/ReactDatePickerProps";
import ContainsTime from "../utils/ContainsTime";
import MaskedInput from "react-text-mask";
import MapMask from "../utils/MapMask";
import TimeMatch from "../utils/TimeMatch";
import ExtractTimeFormat from "../utils/ExtractTimeFormat";
import MxIcon from "./MxIcon";
import MxFormatter from "../utils/MxFormatter";
import DayOfWeekSelectable from "../utils/DayOfWeekSelectable";
import RemoveTime from "../utils/RemoveTime";

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
    // Accessibility
    required: boolean;
    toggleButtonCaption: string;
    navigateButtonPrefix: string;
    chooseDayPrefix: string;
    monthContainerPrefix: string;
    weekNumberPrefix: string;
    disabledPrefix: string;
    // MxDate Meta Data
    invalid: boolean;
    firstDayOfWeek: number;
    dateFormat: string; // text format (i.e. MM/dd/yyyy)
    language: string;
}

const DatePickerComp = (props: DatePickerProps): ReactElement => {
    const ref = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const buttonClick = (): void => {
        props.setOpen(!props.open);
        setTimeout(() => buttonRef.current?.focus(), 10);
    };

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

    const handleOnChange = useCallback(
        (date: Date | [Date | null, Date | null] | null) => {
            if (props.selectionType === "SINGLE") {
                if (
                    (props.dateFormatEnum !== "DATETIME" && props.dateFormatEnum !== "CUSTOM") ||
                    (showTimeSelect &&
                        date !== null &&
                        props.date !== null &&
                        !Array.isArray(date) &&
                        !TimeMatch(date, props.date))
                ) {
                    // if not date & time picker, close the popper
                    // if date & time picker, close the popper when the time is selected
                    props.setOpen(false);
                    focusInput();
                }
            } else if (props.startDate !== null) {
                // if multi, close the popper when the end date is selected
                props.setOpen(false);
                focusInput();
            }
            props.setDate(date);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [props.date, props.startDate, showTimeSelect, focusInput, props.setDate]
    );

    const createHeader = useCallback(
        (customHeaderProps: ReactDatePickerCustomHeaderProps): ReactNode => (
            <div className="custom-header">
                <MxIcon
                    icon={
                        props.dateFormatEnum !== "MONTH" &&
                        props.dateFormatEnum !== "YEAR" &&
                        props.dateFormatEnum !== "QUARTER"
                            ? { type: "glyph", iconClass: "glyphicon-backward" }
                            : { type: "glyph", iconClass: "glyphicon-triangle-left" }
                    }
                    tabIndex={props.tabIndex}
                    onClick={customHeaderProps.decreaseYear}
                    title={
                        props.navigateButtonPrefix +
                        " " +
                        MxFormatter(
                            new Date(
                                customHeaderProps.date.getFullYear() - 1,
                                customHeaderProps.date.getMonth(),
                                customHeaderProps.date.getDay()
                            ),
                            "yyyy"
                        )
                    }
                    style={
                        customHeaderProps.customHeaderCount !== 0 && props.dateFormatEnum !== "YEAR"
                            ? { visibility: "hidden" }
                            : undefined
                    }
                    disabled={customHeaderProps.prevYearButtonDisabled}
                />
                {props.dateFormatEnum !== "MONTH" &&
                    props.dateFormatEnum !== "YEAR" &&
                    props.dateFormatEnum !== "QUARTER" && (
                        <MxIcon
                            icon={{ type: "glyph", iconClass: "glyphicon-triangle-left" }}
                            tabIndex={props.tabIndex}
                            onClick={customHeaderProps.decreaseMonth}
                            title={
                                props.navigateButtonPrefix +
                                " " +
                                MxFormatter(
                                    new Date(
                                        customHeaderProps.date.getFullYear(),
                                        customHeaderProps.date.getMonth() - 1,
                                        customHeaderProps.date.getDay()
                                    ),
                                    "MMMM"
                                )
                            }
                            style={customHeaderProps.customHeaderCount !== 0 ? { visibility: "hidden" } : undefined}
                            disabled={customHeaderProps.prevMonthButtonDisabled}
                        />
                    )}

                <span className="mx-text">
                    {props.dateFormatEnum === "DATE" ||
                    props.dateFormatEnum === "DATETIME" ||
                    props.dateFormatEnum === "CUSTOM" ||
                    props.dateFormatEnum === "TIME"
                        ? MxFormatter(customHeaderProps.monthDate, "MMMM yyyy")
                        : props.dateFormatEnum !== "YEAR"
                        ? MxFormatter(customHeaderProps.monthDate, "yyyy")
                        : MxFormatter(new Date(customHeaderProps.date.getFullYear() - 6, 0, 1), "yyyy") +
                          " - " +
                          MxFormatter(new Date(customHeaderProps.date.getFullYear() + 5, 0, 1), "yyyy")}
                </span>
                {props.dateFormatEnum !== "MONTH" &&
                    props.dateFormatEnum !== "YEAR" &&
                    props.dateFormatEnum !== "QUARTER" && (
                        <MxIcon
                            icon={{ type: "glyph", iconClass: "glyphicon-triangle-right" }}
                            tabIndex={props.tabIndex}
                            onClick={customHeaderProps.increaseMonth}
                            title={
                                props.navigateButtonPrefix +
                                " " +
                                MxFormatter(
                                    new Date(
                                        customHeaderProps.date.getFullYear(),
                                        customHeaderProps.date.getMonth() + 1,
                                        customHeaderProps.date.getDay()
                                    ),
                                    "MMMM"
                                )
                            }
                            style={
                                customHeaderProps.customHeaderCount !== props.monthsToDisplay - 1
                                    ? { visibility: "hidden" }
                                    : undefined
                            }
                            disabled={customHeaderProps.nextMonthButtonDisabled}
                        />
                    )}

                <MxIcon
                    icon={
                        props.dateFormatEnum !== "MONTH" &&
                        props.dateFormatEnum !== "YEAR" &&
                        props.dateFormatEnum !== "QUARTER"
                            ? { type: "glyph", iconClass: "glyphicon-forward" }
                            : { type: "glyph", iconClass: "glyphicon-triangle-right" }
                    }
                    tabIndex={props.tabIndex}
                    onClick={customHeaderProps.increaseYear}
                    title={
                        props.navigateButtonPrefix +
                        " " +
                        MxFormatter(
                            new Date(
                                customHeaderProps.date.getFullYear() + 1,
                                customHeaderProps.date.getMonth(),
                                customHeaderProps.date.getDay()
                            ),
                            "yyyy"
                        )
                    }
                    style={
                        customHeaderProps.customHeaderCount !== props.monthsToDisplay - 1 &&
                        props.dateFormatEnum !== "YEAR"
                            ? { visibility: "hidden" }
                            : undefined
                    }
                    disabled={customHeaderProps.nextYearButtonDisabled}
                />
            </div>
        ),

        [props.language, props.monthsToDisplay, props.navigateButtonPrefix, props.tabIndex, props.dateFormatEnum]
    );

    return (
        <div
            className={classNames("mendix-react-datepicker", { "icon-inside": props.showIconInside })}
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
            <DatePicker
                id={props.id}
                tabIndex={props.tabIndex}
                allowSameDay={false}
                ariaLabelledBy={`${props.id}-label`}
                autoFocus={false}
                calendarStartDay={props.firstDayOfWeek}
                className="form-control"
                dateFormat={props.dateFormat}
                timeFormat={showTimeSelect ? ExtractTimeFormat(props.dateFormat) : undefined}
                disabled={props.readonly}
                disabledKeyboardNavigation={false}
                dropdownMode="select"
                locale={props.language}
                onChange={handleOnChange}
                placeholderText={props.placeholder}
                popperPlacement={
                    props.alignment === "LEFT" ? "bottom-start" : props.alignment === "RIGHT" ? "bottom-end" : "auto"
                }
                popperProps={{
                    strategy: "fixed"
                }}
                popperModifiers={[
                    {
                        name: "offset",
                        options: {
                            offset: [0, 0]
                        }
                    }
                ]}
                readOnly={props.readonly}
                selectsRange={props.selectionType === "MULTI"}
                startDate={props.startDate ? props.startDate : undefined}
                endDate={props.endDate ? props.endDate : undefined}
                selected={props.date}
                showPopperArrow={props.showArrow}
                strictParsing
                useWeekdaysShort={false}
                minDate={props.minDate}
                maxDate={props.maxDate}
                minTime={props.minTime}
                maxTime={props.maxTime}
                includeDates={props.specificDaysMode === "INCLUDE" ? props.specificDays : undefined}
                excludeDates={props.specificDaysMode === "EXCLUDE" ? props.specificDays : undefined}
                includeTimes={props.specificTimesMode === "INCLUDE" ? props.specificTimes : undefined}
                excludeTimes={props.specificTimesMode === "EXCLUDE" ? props.specificTimes : undefined}
                includeDateIntervals={props.intervalDaysMode === "INCLUDE" ? props.intervalDays : undefined}
                excludeDateIntervals={props.intervalDaysMode === "EXCLUDE" ? props.intervalDays : undefined}
                filterDate={date =>
                    DayOfWeekSelectable(
                        date,
                        props.disableSunday,
                        props.disableMonday,
                        props.disableTuesday,
                        props.disableWednesday,
                        props.disableThursday,
                        props.disableFriday,
                        props.disableSunday
                    )
                }
                open={props.open}
                onInputClick={() => props.setOpen(true)}
                onClickOutside={event => {
                    if (buttonRef.current?.contains(event.target as Node)) {
                        return;
                    }
                    props.setOpen(false);
                }}
                onKeyDown={event => {
                    switch (event.key) {
                        case " ":
                            if (!props.open) {
                                event.preventDefault();
                                props.setOpen(true);
                            }
                            break;
                        case "Escape":
                            props.setOpen(false);
                            focusInput();
                            break;
                    }
                }}
                isClearable={props.clearable}
                monthsShown={props.monthsToDisplay}
                showWeekNumbers={props.showWeekNumbers}
                showPreviousMonths={props.showPreviousMonths}
                inline={props.showInline}
                showMonthYearPicker={props.dateFormatEnum === "MONTH"}
                showQuarterYearPicker={props.dateFormatEnum === "QUARTER"}
                showYearPicker={props.dateFormatEnum === "YEAR"}
                showTimeSelect={showTimeSelect}
                showTimeSelectOnly={props.dateFormatEnum === "TIME"}
                timeIntervals={props.timeInterval}
                timeCaption={props.timeCaption}
                openToDate={props.openToDate}
                autoComplete="off"
                customInput={
                    props.maskInput ? (
                        <MaskedInput
                            mask={MapMask(props.dateFormat)}
                            keepCharPositions
                            guide
                            placeholder={props.placeholder}
                        />
                    ) : undefined
                }
                renderCustomHeader={createHeader}
                ariaInvalid={props.invalid ? "true" : "false"}
                ariaRequired={props.required ? "true" : "false"}
                chooseDayAriaLabelPrefix={props.chooseDayPrefix}
                monthAriaLabelPrefix={props.monthContainerPrefix}
                weekAriaLabelPrefix={props.weekNumberPrefix}
                disabledDayAriaLabelPrefix={props.disabledPrefix}
            >
                {props.showTodayButton && (
                    <button
                        className="btn btn-default btn-block today-button"
                        aria-label={props.chooseDayPrefix + " " + props.todayButtonText}
                        tabIndex={props.tabIndex}
                        onClick={() => handleOnChange(RemoveTime(new Date()))}
                    >
                        {props.todayButtonText}
                    </button>
                )}
                {props.customChildren}
            </DatePicker>
            {!props.showInline && props.showIcon && (
                <button
                    title={props.toggleButtonCaption}
                    aria-label={props.toggleButtonCaption}
                    aria-controls={props.id}
                    aria-haspopup
                    ref={buttonRef}
                    className="btn btn-default btn-calendar spacing-outer-left"
                    onClick={buttonClick}
                    tabIndex={-1}
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
