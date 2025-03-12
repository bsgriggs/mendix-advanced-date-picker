import classNames from "classnames";
import { ReactElement, createElement, useRef, useState, useEffect, KeyboardEvent, useCallback } from "react";
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
    languageTag: string;
}

export function IMask(props: IMaskProps): ReactElement {
    const ref = useRef<HTMLInputElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [strValue, setStrValue] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [lastKeyPressed, setLastKeyPressed] = useState<string | null>(null);
    const [accepted, setAccepted] = useState<boolean>(false);

    /* eslint-disable */
    // @ts-ignore
    const locale = window.mx.session.getConfig().locale;

    /* eslint-enable */

    const getErrorMessage = useCallback((): string => {
        const currentLanguage: string = props.languageTag ? props.languageTag : "en";
        const errorMessages: Record<string, string> = {
            en: "Invalid date format",
            nl: "Ongeldig datumformaat"
        };
        return errorMessages[currentLanguage] || errorMessages.en;
    }, [props.languageTag]);

    if (inputRef.current !== null) {
        inputRef.current.className = classNames("form-control");
    }

    useEffect(() => {
        if (document.activeElement !== inputRef.current) {
            setStrValue(MxFormatter(props.date, props.format));
            setErrorMessage(null);
        }
    }, [props.date, props.format]);

    useEffect(() => {
        if (lastKeyPressed !== null) {
            // If a key was pressed but not accepted, show the error
            if (!accepted) {
                setErrorMessage(getErrorMessage());
            } else {
                setErrorMessage(null); // Clear error if accepted
            }
        }
    }, [lastKeyPressed, accepted, getErrorMessage]); // Runs after every key press

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
        // Ignore special keys like backspace, delete, arrow keys, etc.
        if ((event.key.length > 1 && event.key !== "Enter") || props.date) {
            return;
        }
        setLastKeyPressed(event.key);
        setAccepted(false); // Assume rejection unless onAccept proves otherwise
    };

    const handleOnAccept = (value: string): void => {
        setStrValue(value);
        setAccepted(true); // Mark that the last keypress was accepted
        const parsedDate = MxParser(value, props.format);
        if (parsedDate) {
            props.setDate(parsedDate);
        } else {
            props.setDate(null);
        }
    };

    const handleOnBlur = (value: string): void => {
        if (value.trim() === "") {
            setErrorMessage(null);
            props.setDate(null);
        } else {
            const parsedDate = MxParser(value, props.format);
            if (!parsedDate) {
                setErrorMessage(getErrorMessage());
            } else {
                setErrorMessage(null);
                const newDateStr = MxFormatter(parsedDate, props.format);
                if (inputRef.current) {
                    inputRef.current.value = newDateStr;
                }
                props.setDate(parsedDate);
                setStrValue(newDateStr);
            }
        }
    };

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
                        handleOnAccept(value);
                    }
                }}
                onKeyDown={handleKeyDown} // Track key events to detect rejected input
                onBlur={() => {
                    if (inputRef.current) {
                        handleOnBlur(strValue);
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
            {errorMessage && <div className="text-danger mt-1">{errorMessage}</div>}
        </div>
    );
}
