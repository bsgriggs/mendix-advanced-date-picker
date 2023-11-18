import { ReactElement, createElement, useCallback, useRef, useMemo } from "react";
import DatePicker from "react-datepicker";
import { WebIcon } from "mendix";
import { Icon } from "mendix/components/web/Icon";
import * as locales from "date-fns/locale";
import { registerLocale } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import classNames from "classnames";
import { DisableDateModeEnum, SelectionTypeEnum } from "typings/ReactDatePickerProps";

interface DatePickerProps {
    //System
    id: string;
    tabIndex: number;
    //General
    placeholder: string;
    selectionType: SelectionTypeEnum;
    date: Date | null;
    setDate: (newDate: Date | [Date | null, Date | null] | null) => void;
    startDate: Date | null;
    endDate: Date | null;
    readonly: boolean;
    //Disable Dates
    minDate: Date | undefined;
    maxDate: Date | undefined;
    disableDateMode: DisableDateModeEnum;
    disabledDays: Date[];
    disableSunday: boolean;
    disableMonday: boolean;
    disableTuesday: boolean;
    disableWednesday: boolean;
    disableThursday: boolean;
    disableFriday: boolean;
    disableSaturday: boolean;
    // Customization
    icon: WebIcon;
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
    const id = useMemo(() => `datepicker_` + Math.random(), []);

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
                dateFormat={patterns.date}
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
                placeholderText={props.placeholder.length > 0 ? props.placeholder : patterns.date}
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
                showPopperArrow={false}
                showYearDropdown
                strictParsing
                useWeekdaysShort={false}
                minDate={props.minDate}
                maxDate={props.maxDate}
                includeDates={props.disableDateMode === "INCLUDE" ? props.disabledDays : undefined}
                excludeDates={props.disableDateMode === "EXCLUDE" ? props.disabledDays : undefined}
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
            />
            <button
                aria-controls={id}
                aria-haspopup
                ref={buttonRef}
                className="btn btn-default btn-calendar spacing-outer-left"
                onClick={buttonClick}
                onKeyDown={e => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        e.stopPropagation();
                        buttonClick();
                    }
                }}
            >
                {/*@ts-ignore*/}
                <Icon key={props.icon} icon={props.icon} />
            </button>
        </div>
    );
};

export default DatePickerComp;
