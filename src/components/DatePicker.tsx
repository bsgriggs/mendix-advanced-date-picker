import { ReactElement, createElement, useCallback } from "react";
import DatePicker from "react-datepicker";
import { WebIcon } from "mendix";
import { Icon } from "mendix/components/web/Icon";

import "react-datepicker/dist/react-datepicker.css";
import classNames from "classnames";
import { DisableDateModeEnum } from "typings/ReactDatePickerProps";

interface DatePickerProps {
    //System
    id: string;
    //General
    placeholder: string;
    date: Date | null;
    setDate: (newDate: Date | null) => void;
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
            const exp =
                (!props.disableSunday && date.getDay() === 0) ||
                (!props.disableMonday && date.getDay() === 1) ||
                (!props.disableTuesday && date.getDay() === 2) ||
                (!props.disableWednesday && date.getDay() === 3) ||
                (!props.disableThursday && date.getDay() === 4) ||
                (!props.disableFriday && date.getDay() === 5) ||
                (!props.disableSaturday && date.getDay() === 6);
            console.info(date.getDay(), exp);
            return exp;
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
                allowSameDay={false}
                ariaLabelledBy={`${props.id}-label`}
                autoFocus={false}
                calendarStartDay={firstDayOfWeek}
                className={classNames("form-control")}
                dateFormat={patterns.date}
                disabled={props.readonly}
                disabledKeyboardNavigation={false}
                dropdownMode="select"
                enableTabLoop
                // endDate={props.enableRange ? props.rangeValues?.[1] : undefined}
                isClearable
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
                preventOpenOnFocus
                readOnly={props.readonly}
                // startDate={props.enableRange ? props.rangeValues?.[0] : undefined}
                selected={props.date}
                // selectsRange={props.enableRange}
                // shouldCloseOnSelect={false}
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
