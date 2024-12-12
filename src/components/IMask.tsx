import classNames from "classnames";
import { ReactElement, createElement, useRef, useState, useEffect } from "react";
import { IMaskInput, IMask as IM } from "react-imask";
import MxFormatter from "../utils/MxFormatter";
import MxParser from "../utils/MxParser";

export interface IMaskProps {
    id: string;
    tabIndex: number;
    date: Date | null;
    setDate: (newValue: Date | null) => void;
    format: string;
    readOnly: boolean;
    placeholder: string;
}

export function IMask(props: IMaskProps): ReactElement {
    const ref = useRef<HTMLInputElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [strValue, setStrValue] = useState<string>("");

    /* eslint-disable */
    // @ts-ignore
    const locale = window.mx.session.getConfig().locale;
    /* eslint-enable */

    if (inputRef.current !== null) {
        inputRef.current.className = classNames("form-control");
    }

    useEffect(() => {
        if (document.activeElement !== inputRef.current) {
            setStrValue(MxFormatter(props.date, props.format));
        }
    }, [props.date, props.format]);

    // https://imask.js.org/guide.html#masked-date
    return (
        <div id={props.id} className="iMask">
            <IMaskInput
                readOnly={props.readOnly}
                placeholder={props.placeholder}
                mask={Date}
                pattern={props.format}
                value={strValue}
                ref={ref}
                inputRef={inputRef}
                format={(date: Date) => MxFormatter(date, props.format)}
                parse={(str: string) => MxParser(str, props.format)}
                lazy={strValue.trim() === ""}
                onAccept={(value, _mask, event) => {
                    if (event !== undefined && event.target === document.activeElement) {
                        props.setDate(MxParser(value, props.format));

                        setStrValue(value);
                    }
                }}
                onBlur={() => {
                    if (inputRef.current) {
                        const newDate = MxParser(strValue, props.format);
                        const newDateStr = MxFormatter(newDate, props.format);
                        inputRef.current.value = newDateStr;
                        props.setDate(newDate);
                        setStrValue(newDateStr);
                    }
                }}
                blocks={{
                    dd: {
                        mask: IM.MaskedRange,
                        from: 1,
                        to: 31,
                        maxLength: 2,
                        placeholderChar: "d"
                    },
                    MM: {
                        mask: IM.MaskedRange,
                        from: 1,
                        to: 12,
                        maxLength: 2,
                        placeholderChar: "M"
                    },
                    MMM: {
                        mask: IM.MaskedEnum,
                        enum: locale.dates.shortMonths,
                        matchValue: (enumStr: string, inputStr, matchFrom: number): boolean =>
                            IM.MaskedEnum.DEFAULTS.matchValue(enumStr.toLowerCase(), inputStr.toLowerCase(), matchFrom),
                        placeholderChar: "M"
                    },
                    yyyy: {
                        mask: IM.MaskedRange,
                        from: 1000,
                        to: 9999,
                        placeholderChar: "y"
                    },
                    YYYY: {
                        mask: IM.MaskedRange,
                        from: 1000,
                        to: 9999,
                        placeholderChar: "Y"
                    },
                    yy: {
                        mask: IM.MaskedRange,
                        from: 0,
                        to: 99,
                        placeholderChar: "y"
                    },
                    YY: {
                        mask: IM.MaskedRange,
                        from: 0,
                        to: 99,
                        placeholderChar: "Y"
                    },
                    HH: {
                        mask: IM.MaskedRange,
                        from: 0,
                        to: 23,
                        maxLength: 2,
                        placeholderChar: "H"
                    },
                    hh: {
                        mask: IM.MaskedRange,
                        from: 1,
                        to: 12,
                        maxLength: 2,
                        placeholderChar: "h"
                    },
                    mm: {
                        mask: IM.MaskedRange,
                        from: 0,
                        to: 59,
                        maxLength: 2,
                        placeholderChar: "m"
                    },
                    ss: {
                        mask: IM.MaskedRange,
                        from: 0,
                        to: 59,
                        maxLength: 2,
                        placeholderChar: "s"
                    },
                    a: {
                        mask: IM.MaskedEnum,
                        enum: locale.dates.dayPeriods,
                        matchValue: (enumStr: string, inputStr, matchFrom: number): boolean =>
                            IM.MaskedEnum.DEFAULTS.matchValue(enumStr.toLowerCase(), inputStr.toLowerCase(), matchFrom),
                        placeholderChar: "A"
                    },
                    A: {
                        mask: IM.MaskedEnum,
                        enum: locale.dates.dayPeriods,
                        matchValue: (enumStr: string, inputStr, matchFrom: number): boolean =>
                            IM.MaskedEnum.DEFAULTS.matchValue(enumStr.toLowerCase(), inputStr.toLowerCase(), matchFrom),
                        placeholderChar: "A"
                    }
                }}
            />
        </div>
    );
}
