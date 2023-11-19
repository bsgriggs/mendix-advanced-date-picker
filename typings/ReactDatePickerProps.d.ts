/**
 * This file was generated from ReactDatePicker.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { ComponentType, ReactNode } from "react";
import { ActionValue, DynamicValue, EditableValue, ListValue, ListAttributeValue, WebIcon } from "mendix";
import { Big } from "big.js";

export type SelectionTypeEnum = "SINGLE" | "MULTI";

export type SpecificDaysModeEnum = "OFF" | "INCLUDE" | "EXCLUDE";

export type IntervalDaysModeEnum = "OFF" | "INCLUDE" | "EXCLUDE";

export interface ReactDatePickerContainerProps {
    name: string;
    tabIndex?: number;
    id: string;
    placeholder?: DynamicValue<string>;
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
    icon?: DynamicValue<WebIcon>;
    showTodayButton: DynamicValue<boolean>;
    todayButtonText?: DynamicValue<string>;
    useCustomChildren: boolean;
    customChildren: ReactNode;
    clearable: DynamicValue<boolean>;
    monthsToDisplay: DynamicValue<Big>;
    showWeekNumbers: DynamicValue<boolean>;
    showPreviousMonth: DynamicValue<boolean>;
    showArrow: boolean;
    showInline: DynamicValue<boolean>;
    onEnter?: ActionValue;
    onLeave?: ActionValue;
}

export interface ReactDatePickerPreviewProps {
    readOnly: boolean;
    placeholder: string;
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
    icon: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; iconUrl: string; } | { type: "icon"; iconClass: string; } | undefined;
    showTodayButton: string;
    todayButtonText: string;
    useCustomChildren: boolean;
    customChildren: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> };
    clearable: string;
    monthsToDisplay: string;
    showWeekNumbers: string;
    showPreviousMonth: string;
    showArrow: boolean;
    showInline: string;
    onChange: {} | null;
    onEnter: {} | null;
    onLeave: {} | null;
}
