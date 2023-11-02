import { ReactElement, createElement } from "react";
import DatePicker from "react-datepicker";
import { WebIcon } from "mendix";
// import { Icon } from "mendix/components/web/Icon";

import "react-datepicker/dist/react-datepicker.css";
import classNames from "classnames";

interface DatePickerProps {
    //System
    id: string;
    //General
    placeholder: string;
    date: Date | null;
    setDate: (newDate: Date | null) => void;
    readonly: boolean;
    //Disable Dates
    //
    // Customization
    icon: WebIcon;
}

const DatePickerComp = (props: DatePickerProps): ReactElement => {
    return (
        <DatePicker
            allowSameDay={false}
            ariaLabelledBy={`${props.id}-label`}
            autoFocus={false}
            //calendarStartDay={props.calendarStartDay}
            className={classNames("form-control")}
            // dateFormat={dateFormats}
            disabled={props.readonly}
            disabledKeyboardNavigation={false}
            dropdownMode="select"
            enableTabLoop
            // endDate={props.enableRange ? props.rangeValues?.[1] : undefined}
            isClearable
            // locale={props.locale}
            onChange={date => props.setDate(date)}
            placeholderText={props.placeholder}
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
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48">
                    <mask id="ipSApplication0">
                        <g fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth="4">
                            <path strokeLinecap="round" d="M40.04 22v20h-32V22"></path>
                            <path
                                fill="#fff"
                                d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
                            ></path>
                        </g>
                    </mask>
                    <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSApplication0)"></path>
                </svg>
            }
        />
    );
};

export default DatePickerComp;
