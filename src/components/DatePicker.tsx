import { ReactElement, createElement, useCallback, useRef, useMemo, ReactNode } from "react";
import DatePicker from "react-datepicker";
import { WebIcon } from "mendix";
import { Icon } from "mendix/components/web/Icon";
import * as locales from "date-fns/locale";
import { registerLocale } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import classNames from "classnames";
import {
    IntervalDaysModeEnum,
    SpecificDaysModeEnum,
    SelectionTypeEnum,
    DateFormatEnum,
    SpecificTimesModeEnum
} from "typings/ReactDatePickerProps";
import ContainsTime from "../utils/ContainsTime";

interface DatePickerProps {
    //System
    id: string;
    tabIndex: number;
    //General
    placeholder: string;
    dateFormat: DateFormatEnum;
    timeInterval: number;
    timeCaption: string;
    customDateFormat: string;
    selectionType: SelectionTypeEnum;
    date: Date | null;
    setDate: (newDate: Date | [Date | null, Date | null] | null) => void;
    startDate: Date | null;
    endDate: Date | null;
    readonly: boolean;
    //Selectable Dates
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
    //Selectable Times
    minTime: Date | undefined;
    maxTime: Date | undefined;
    specificTimesMode: SpecificTimesModeEnum;
    specificTimes: Date[];
    // Customization
    showIcon: boolean;
    icon: WebIcon;
    showTodayButton: boolean;
    todayButtonText: string;
    customChildren: ReactNode | undefined;
    clearable: boolean;
    monthsToDisplay: number;
    showWeekNumbers: boolean;
    showPreviousMonths: boolean;
    showArrow: boolean;
    showInline: boolean;
    openToDate: Date;
    // Other
    open: boolean;
    setOpen: (newOpen: boolean) => void;
}

interface Locale {
    [key: string]: object;
}

const DatePickerComp = (props: DatePickerProps): ReactElement => {
    const ref = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    // const id = useMemo(() => `datepicker_` + Math.random(), []);

    const buttonClick = useCallback(() => {
        props.setOpen(!props.open);
        setTimeout(() => buttonRef.current?.focus(), 10);
    }, []);

    /* eslint-disable */
    // @ts-ignore
    const { languageTag = "en-US", patterns, firstDayOfWeek } = window.mx.session.getConfig().locale;
    /* eslint-enable */
    const [language] = useMemo(() => {
        let language = languageTag.split("-");
        const languageTagWithoutDash = languageTag.replace("-", "");
        if (languageTagWithoutDash in locales) {
            registerLocale(language, (locales as Locale)[languageTagWithoutDash]);
        } else if (language in locales) {
            registerLocale(language, (locales as Locale)[language]);
        }
        return language;
    }, []);

    const dateFormat = useMemo(
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
                ? "MMMM yyyy"
                : props.dateFormat === "QUARTER"
                ? "yyyy QQQ"
                : props.customDateFormat,
        [props.dateFormat, props.customDateFormat]
    );

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
            className="mendix-react-datepicker"
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
                calendarStartDay={firstDayOfWeek}
                className={classNames("form-control")}
                dateFormat={dateFormat}
                disabled={props.readonly}
                disabledKeyboardNavigation={false}
                dropdownMode="select"
                locale={language}
                onChange={date => {
                    if ((Array.isArray(date) && date[1] !== null) || (!Array.isArray(date) && date !== null)) {
                        props.setOpen(false);
                    }
                    props.setDate(date);
                }}
                placeholderText={props.placeholder.length > 0 ? props.placeholder : dateFormat}
                popperPlacement="bottom-end"
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
                showMonthYearPicker={props.dateFormat === "MONTH"}
                showQuarterYearPicker={props.dateFormat === "QUARTER"}
                showYearPicker={props.dateFormat === "YEAR"}
                showTimeSelect={
                    props.dateFormat === "DATETIME" ||
                    props.dateFormat === "TIME" ||
                    (props.dateFormat === "CUSTOM" && ContainsTime(props.customDateFormat))
                }
                showTimeSelectOnly={props.dateFormat === "TIME"}
                timeIntervals={props.timeInterval}
                timeCaption={props.timeCaption}
                openToDate={props.openToDate}
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
                >
                    {/*@ts-ignore*/}
                    <Icon key={props.icon} icon={props.icon} />
                </button>
            )}
        </div>
    );
};

export default DatePickerComp;
