/**
 * This file was generated from AdvancedDatePicker.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { ComponentType, ReactNode } from "react";
import { ActionValue, DynamicValue, EditableValue, ListValue, ListAttributeValue, WebIcon } from "mendix";
import { Big } from "big.js";

export type DateFormatEnum = "DATE" | "MONTH" | "QUARTER" | "YEAR" | "TIME" | "DATETIME" | "CUSTOM";

export type SelectionTypeEnum = "SINGLE" | "RANGE";

export type SpecificDaysModeEnum = "OFF" | "INCLUDE" | "EXCLUDE";

export type IntervalDaysModeEnum = "OFF" | "INCLUDE" | "EXCLUDE";

export type SpecificTimesModeEnum = "OFF" | "INCLUDE" | "EXCLUDE";

export type AlignmentEnum = "LEFT" | "RIGHT" | "AUTO";

export interface AdvancedDatePickerContainerProps {
    name: string;
    tabIndex?: number;
    id: string;
    placeholder?: DynamicValue<string>;
    dateFormat: DateFormatEnum;
    timeInterval: DynamicValue<Big>;
    timeCaption: DynamicValue<string>;
    customDateFormat: DynamicValue<string>;
    selectionType: SelectionTypeEnum;
    dateAttribute: EditableValue<Date>;
    startDateAttribute: EditableValue<Date>;
    endDateAttribute: EditableValue<Date>;
    minDate?: DynamicValue<Date>;
    maxDate?: DynamicValue<Date>;
    specificDaysMode: SpecificDaysModeEnum;
    specificDaysDatasource: ListValue;
    specificDaysAttribute: ListAttributeValue<Date>;
    intervalDaysMode: IntervalDaysModeEnum;
    intervalDaysDatasource: ListValue;
    intervalDaysStart: ListAttributeValue<Date>;
    intervalDaysEnd: ListAttributeValue<Date>;
    disableSunday: DynamicValue<boolean>;
    disableMonday: DynamicValue<boolean>;
    disableTuesday: DynamicValue<boolean>;
    disableWednesday: DynamicValue<boolean>;
    disableThursday: DynamicValue<boolean>;
    disableFriday: DynamicValue<boolean>;
    disableSaturday: DynamicValue<boolean>;
    minTime?: DynamicValue<Date>;
    maxTime?: DynamicValue<Date>;
    specificTimesMode: SpecificTimesModeEnum;
    specificTimesDatasource: ListValue;
    specificTimeAttribute: ListAttributeValue<Date>;
    clearable: DynamicValue<boolean>;
    openToDate?: DynamicValue<Date>;
    maskInput: boolean;
    useCustomContent: boolean;
    customContent: ReactNode;
    showIcon: boolean;
    showIconInside: boolean;
    customIcon?: DynamicValue<WebIcon>;
    showTodayButton: boolean;
    todayButtonText?: DynamicValue<string>;
    monthsToDisplay: DynamicValue<Big>;
    showPreviousMonth: DynamicValue<boolean>;
    showInline: DynamicValue<boolean>;
    showWeekNumbers: boolean;
    showArrow: boolean;
    alignment: AlignmentEnum;
    onEnter?: ActionValue;
    onLeave?: ActionValue;
    required: DynamicValue<boolean>;
    calendarIconLabel: DynamicValue<string>;
    navigateButtonPrefix: DynamicValue<string>;
    selectPrefix: DynamicValue<string>;
    weekPrefix: DynamicValue<string>;
    monthPrefix: DynamicValue<string>;
    monthSelectLabel: DynamicValue<string>;
    yearSelectLabel: DynamicValue<string>;
    disabledLabel: DynamicValue<string>;
    clearButtonLabel: DynamicValue<string>;
}

export interface AdvancedDatePickerPreviewProps {
    readOnly: boolean;
    placeholder: string;
    dateFormat: DateFormatEnum;
    timeInterval: string;
    timeCaption: string;
    customDateFormat: string;
    selectionType: SelectionTypeEnum;
    dateAttribute: string;
    startDateAttribute: string;
    endDateAttribute: string;
    minDate: string;
    maxDate: string;
    specificDaysMode: SpecificDaysModeEnum;
    specificDaysDatasource: {} | { caption: string } | { type: string } | null;
    specificDaysAttribute: string;
    intervalDaysMode: IntervalDaysModeEnum;
    intervalDaysDatasource: {} | { caption: string } | { type: string } | null;
    intervalDaysStart: string;
    intervalDaysEnd: string;
    disableSunday: string;
    disableMonday: string;
    disableTuesday: string;
    disableWednesday: string;
    disableThursday: string;
    disableFriday: string;
    disableSaturday: string;
    minTime: string;
    maxTime: string;
    specificTimesMode: SpecificTimesModeEnum;
    specificTimesDatasource: {} | { caption: string } | { type: string } | null;
    specificTimeAttribute: string;
    clearable: string;
    openToDate: string;
    maskInput: boolean;
    useCustomContent: boolean;
    customContent: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> };
    showIcon: boolean;
    showIconInside: boolean;
    customIcon: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; iconUrl: string; } | { type: "icon"; iconClass: string; } | undefined;
    showTodayButton: boolean;
    todayButtonText: string;
    monthsToDisplay: string;
    showPreviousMonth: string;
    showInline: string;
    showWeekNumbers: boolean;
    showArrow: boolean;
    alignment: AlignmentEnum;
    onChange: {} | null;
    onEnter: {} | null;
    onLeave: {} | null;
    required: string;
    calendarIconLabel: string;
    navigateButtonPrefix: string;
    selectPrefix: string;
    weekPrefix: string;
    monthPrefix: string;
    monthSelectLabel: string;
    yearSelectLabel: string;
    disabledLabel: string;
    clearButtonLabel: string;
}
