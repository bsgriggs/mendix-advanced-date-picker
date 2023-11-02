/**
 * This file was generated from ReactDatePicker.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { ActionValue, DynamicValue, EditableValue, ListValue, ListAttributeValue, WebIcon } from "mendix";

export type SelectionTypeEnum = "SINGLE" | "MULTI";

export type DisableDateModeEnum = "OFF" | "INCLUDE" | "EXCLUDE";

export interface ReactDatePickerContainerProps {
    name: string;
    tabIndex?: number;
    id: string;
    placeholder?: DynamicValue<string>;
    selectionType: SelectionTypeEnum;
    dateAttribute: EditableValue<Date>;
    minDate?: DynamicValue<Date>;
    maxDate?: DynamicValue<Date>;
    disableDateMode: DisableDateModeEnum;
    disableDatesDatasource?: ListValue;
    disableDatesAttribute?: ListAttributeValue<Date>;
    disableSunday: DynamicValue<boolean>;
    disableMonday: DynamicValue<boolean>;
    disableTuesday: DynamicValue<boolean>;
    disableWednesday: DynamicValue<boolean>;
    disableThursday: DynamicValue<boolean>;
    disableFriday: DynamicValue<boolean>;
    disableSaturday: DynamicValue<boolean>;
    icon?: DynamicValue<WebIcon>;
    onEnter?: ActionValue;
    onLeave?: ActionValue;
}

export interface ReactDatePickerPreviewProps {
    readOnly: boolean;
    placeholder: string;
    selectionType: SelectionTypeEnum;
    dateAttribute: string;
    minDate: string;
    maxDate: string;
    disableDateMode: DisableDateModeEnum;
    disableDatesDatasource: {} | { caption: string } | { type: string } | null;
    disableDatesAttribute: string;
    disableSunday: string;
    disableMonday: string;
    disableTuesday: string;
    disableWednesday: string;
    disableThursday: string;
    disableFriday: string;
    disableSaturday: string;
    icon: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; iconUrl: string; } | { type: "icon"; iconClass: string; } | undefined;
    onChange: {} | null;
    onEnter: {} | null;
    onLeave: {} | null;
}
