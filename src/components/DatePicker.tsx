import { ReactElement, createElement, useCallback } from "react";
import DatePicker from "react-datepicker";
import { WebIcon } from "mendix";
import { Icon } from "mendix/components/web/Icon";

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
}

const DatePickerComp = (props: DatePickerProps): ReactElement => {
    /* eslint-disable */
    // @ts-ignore
    const { languageTag = "en-US", patterns, firstDayOfWeek } = window.mx.session.getConfig().locale;
    /* eslint-enable */

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
        <div className="mendix-react-datepicker">
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
                locale={languageTag}
                onChange={date => props.setDate(date)}
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
            />
            <div className="calendar-icon">
                <Icon icon={props.icon} />
            </div>
        </div>
    );
};

export default DatePickerComp;
