import { createElement, ReactElement, forwardRef, useState, ChangeEvent, useCallback, useMemo, useEffect } from "react";
import { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import MxFormatter from "../utils/MxFormatter";
import { DateFormatEnum } from "typings/ReactDatePickerProps";
import MxIconButton from "./MxIconButton";

type CustomHeaderProps = {
    dateFormatEnum: DateFormatEnum;
    tabIndex: number;
    monthsToDisplay: number;
    minDate: Date | undefined;
    maxDate: Date | undefined;
    navigateButtonPrefix: string;
    monthSelectLabel: string;
    yearSelectLabel: string;
    setOpen: (newOpen: boolean) => void;
    focusInput: () => void;
} & ReactDatePickerCustomHeaderProps;

const CustomHeader = forwardRef<HTMLButtonElement, CustomHeaderProps>((props, ref): ReactElement => {
    /* eslint-disable */
    // @ts-ignore
    const { dates } = window.mx.session.getConfig().locale;
    /* eslint-enable */

    const showMonthSelect = useMemo(
        () =>
            props.dateFormatEnum === "DATE" || props.dateFormatEnum === "DATETIME" || props.dateFormatEnum === "CUSTOM",
        [props.dateFormatEnum]
    );

    const showYearSelect = useMemo(
        () =>
            props.dateFormatEnum === "DATE" ||
            props.dateFormatEnum === "DATETIME" ||
            props.dateFormatEnum === "CUSTOM" ||
            props.dateFormatEnum === "MONTH" ||
            props.dateFormatEnum === "QUARTER",
        [props.dateFormatEnum]
    );

    const [monthSelect, setMonthSelect] = useState(props.monthDate.getMonth());

    const [yearSelect, setYearSelect] = useState(props.monthDate.getFullYear());
    useEffect(() => {
        setMonthSelect(props.monthDate.getMonth());
        setYearSelect(props.monthDate.getFullYear());
    }, [props.monthDate]);

    const handleMonthSelect = useCallback(
        (event: ChangeEvent<HTMLSelectElement>): void => {
            const monthNumber = Number(event.target.value);
            setMonthSelect(monthNumber);
            props.changeMonth(monthNumber);
        },
        [props.changeMonth]
    );
    const handleYearSelect = useCallback(
        (event: ChangeEvent<HTMLSelectElement>): void => {
            const yearNumber = Number(event.target.value);
            setYearSelect(yearNumber);
            props.changeYear(yearNumber);
        },
        [props.changeYear]
    );

    const monthOptions = useMemo(
        (): ReactElement[] =>
            showMonthSelect
                ? dates.months.map((value: string, index: number) => {
                      const compareDate = new Date(yearSelect, index + 1, 0); // Last day of iterator month
                      if (
                          (props.minDate === undefined || props.minDate <= compareDate) &&
                          (props.maxDate === undefined || props.maxDate >= compareDate)
                      ) {
                          return (
                              <option key={index} value={index} selected={monthSelect === index}>
                                  {value}
                              </option>
                          );
                      }
                  })
                : [],
        [dates, monthSelect, props.minDate, props.maxDate, showMonthSelect, yearSelect]
    );

    const yearOptions = useMemo((): ReactElement[] => {
        const years: ReactElement[] = [];
        if (showYearSelect) {
            const minYear = props.minDate?.getFullYear() || 1900;
            const maxYear = props.maxDate?.getFullYear() || 2100;

            for (let iYear: number = minYear; iYear <= maxYear; iYear++) {
                years.push(
                    <option key={iYear} value={iYear} selected={yearSelect === iYear}>
                        {iYear}
                    </option>
                );
            }
        }
        return years;
    }, [props.minDate, props.maxDate, yearSelect, showYearSelect]);

    return (
        <div
            className="custom-header"
            onKeyDown={event => {
                if (event.key === "Escape") {
                    props.setOpen(false);
                    props.focusInput();
                }
            }}
        >
            <MxIconButton
                ref={ref}
                icon={
                    props.dateFormatEnum !== "MONTH" &&
                    props.dateFormatEnum !== "YEAR" &&
                    props.dateFormatEnum !== "QUARTER"
                        ? { type: "glyph", iconClass: "glyphicon-backward" }
                        : { type: "glyph", iconClass: "glyphicon-triangle-left" }
                }
                tabIndex={props.tabIndex}
                onClick={props.decreaseYear}
                title={
                    props.navigateButtonPrefix +
                    " " +
                    MxFormatter(
                        new Date(props.date.getFullYear() - 1, props.date.getMonth(), props.date.getDay()),
                        "yyyy"
                    )
                }
                style={
                    props.customHeaderCount !== 0 && props.dateFormatEnum !== "YEAR"
                        ? { visibility: "hidden" }
                        : undefined
                }
                disabled={props.prevYearButtonDisabled}
            />
            {props.dateFormatEnum !== "MONTH" &&
                props.dateFormatEnum !== "YEAR" &&
                props.dateFormatEnum !== "QUARTER" && (
                    <MxIconButton
                        icon={{ type: "glyph", iconClass: "glyphicon-triangle-left" }}
                        tabIndex={props.tabIndex}
                        onClick={props.decreaseMonth}
                        title={
                            props.navigateButtonPrefix +
                            " " +
                            MxFormatter(
                                new Date(
                                    props.monthDate.getFullYear(),
                                    props.monthDate.getMonth() - 1,
                                    props.monthDate.getDay()
                                ),
                                "MMMM yyyy"
                            )
                        }
                        style={props.customHeaderCount !== 0 ? { visibility: "hidden" } : undefined}
                        disabled={props.prevMonthButtonDisabled}
                    />
                )}
            {showMonthSelect && (
                <select onChange={handleMonthSelect} aria-label={props.monthSelectLabel} value={monthSelect}>
                    {monthOptions}
                </select>
            )}
            {showYearSelect && (
                <select onChange={handleYearSelect} aria-label={props.yearSelectLabel} value={yearSelect}>
                    {yearOptions}
                </select>
            )}
            {props.dateFormatEnum === "YEAR" && (
                <span className="mx-text">
                    {MxFormatter(new Date(props.date.getFullYear() - 6, 0, 1), "yyyy") +
                        " - " +
                        MxFormatter(new Date(props.date.getFullYear() + 5, 0, 1), "yyyy")}
                </span>
            )}
            {props.dateFormatEnum !== "MONTH" &&
                props.dateFormatEnum !== "YEAR" &&
                props.dateFormatEnum !== "QUARTER" && (
                    <MxIconButton
                        icon={{ type: "glyph", iconClass: "glyphicon-triangle-right" }}
                        tabIndex={props.tabIndex}
                        onClick={props.increaseMonth}
                        title={
                            props.navigateButtonPrefix +
                            " " +
                            MxFormatter(
                                new Date(
                                    props.monthDate.getFullYear(),
                                    props.monthDate.getMonth() + 1,
                                    props.monthDate.getDay()
                                ),
                                "MMMM yyyy"
                            )
                        }
                        style={
                            props.customHeaderCount !== props.monthsToDisplay - 1 ? { visibility: "hidden" } : undefined
                        }
                        disabled={props.nextMonthButtonDisabled}
                    />
                )}

            <MxIconButton
                icon={
                    props.dateFormatEnum !== "MONTH" &&
                    props.dateFormatEnum !== "YEAR" &&
                    props.dateFormatEnum !== "QUARTER"
                        ? { type: "glyph", iconClass: "glyphicon-forward" }
                        : { type: "glyph", iconClass: "glyphicon-triangle-right" }
                }
                tabIndex={props.tabIndex}
                onClick={props.increaseYear}
                title={
                    props.navigateButtonPrefix +
                    " " +
                    MxFormatter(
                        new Date(props.date.getFullYear() + 1, props.date.getMonth(), props.date.getDay()),
                        "yyyy"
                    )
                }
                style={
                    props.customHeaderCount !== props.monthsToDisplay - 1 && props.dateFormatEnum !== "YEAR"
                        ? { visibility: "hidden" }
                        : undefined
                }
                disabled={props.nextYearButtonDisabled}
            />
        </div>
    );
});

export default CustomHeader;
