import { ReactElement, createElement, useCallback, useRef, ReactNode } from "react";
import DatePicker from "react-datepicker";
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

interface DatePickerProps {
    // System
    id: string;
    tabIndex: number;
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

    // Other
    open: boolean;
    setOpen: (newOpen: boolean) => void;

    //MxDate Meta Data
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

    const filterDate = useCallback(
        (date: Date): boolean => {
            const day = date.getDay();
            return (
                (!props.disableSunday && day === 0) ||
                (!props.disableMonday && day === 1) ||
                (!props.disableTuesday && day === 2) ||
                (!props.disableWednesday && day === 3) ||
                (!props.disableThursday && day === 4) ||
                (!props.disableFriday && day === 5) ||
                (!props.disableSaturday && day === 6)
            );
        },
        [
            props.disableSunday,
            props.disableMonday,
            props.disableTuesday,
            props.disableWednesday,
            props.disableThursday,
            props.disableFriday,
            props.disableSaturday
        ]
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
                disabled={props.readonly}
                disabledKeyboardNavigation={false}
                dropdownMode="select"
                locale={props.language}
                onChange={date => props.setDate(date)} // When the value is set
                onSelect={() => {
                    if (props.selectionType !== "MULTI" || props.startDate !== null) {
                        props.setOpen(false);
                    }
                }} // When a value is selected via mouse
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
                showMonthDropdown
                showPopperArrow={props.showArrow}
                showYearDropdown
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
                filterDate={filterDate}
                open={props.open}
                onInputClick={() => props.setOpen(true)}
                onClickOutside={event => {
                    if (!buttonRef.current || buttonRef.current.contains(event.target as Node)) {
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
                            break;
                    }
                }}
                todayButton={props.showTodayButton ? props.todayButtonText : undefined}
                isClearable={props.clearable}
                monthsShown={props.monthsToDisplay}
                showWeekNumbers={props.showWeekNumbers}
                showPreviousMonths={props.showPreviousMonths}
                inline={props.showInline}
                showMonthYearPicker={props.dateFormatEnum === "MONTH"}
                showQuarterYearPicker={props.dateFormatEnum === "QUARTER"}
                showYearPicker={props.dateFormatEnum === "YEAR"}
                showTimeSelect={
                    props.dateFormatEnum === "DATETIME" ||
                    props.dateFormatEnum === "TIME" ||
                    (props.dateFormatEnum === "CUSTOM" && ContainsTime(props.dateFormat))
                }
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
            >
                {props.customChildren}
            </DatePicker>
            {!props.showInline && props.showIcon && (
                <button
                    aria-controls={props.id}
                    aria-haspopup
                    ref={buttonRef}
                    className="btn btn-default btn-calendar spacing-outer-left"
                    onClick={buttonClick}
                    onKeyDown={e => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            e.stopPropagation();
                            buttonClick();
                        } else if (e.key === "Escape") {
                            props.setOpen(false);
                        }
                    }}
                    tabIndex={-1}
                >
                    <Icon icon={props.icon} />
                </button>
            )}
        </div>
    );
};

export default DatePickerComp;
