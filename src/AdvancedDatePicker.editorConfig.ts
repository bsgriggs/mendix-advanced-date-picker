import { AdvancedDatePickerPreviewProps } from "../typings/AdvancedDatePickerProps";
import { hidePropertiesIn, hidePropertyIn } from "@mendix/pluggable-widgets-tools";
export type Platform = "web" | "desktop";

export type Properties = PropertyGroup[];

type PropertyGroup = {
    caption: string;
    propertyGroups?: PropertyGroup[];
    properties?: Property[];
};

type Property = {
    key: string;
    caption: string;
    description?: string;
    objectHeaders?: string[]; // used for customizing object grids
    objects?: ObjectProperties[];
    properties?: Properties[];
};

type ObjectProperties = {
    properties: PropertyGroup[];
    captions?: string[]; // used for customizing object grids
};

export type Problem = {
    property?: string; // key of the property, at which the problem exists
    severity?: "error" | "warning" | "deprecation"; // default = "error"
    message: string; // description of the problem
    studioMessage?: string; // studio-specific message, defaults to message
    url?: string; // link with more information about the problem
    studioUrl?: string; // studio-specific link
};

type BaseProps = {
    type: "Image" | "Container" | "RowLayout" | "Text" | "DropZone" | "Selectable" | "Datasource";
    grow?: number; // optionally sets a growth factor if used in a layout (default = 1)
};

type ImageProps = BaseProps & {
    type: "Image";
    document?: string; // svg image
    data?: string; // base64 image
    property?: object; // widget image property object from Values API
    width?: number; // sets a fixed maximum width
    height?: number; // sets a fixed maximum height
};

type ContainerProps = BaseProps & {
    type: "Container" | "RowLayout";
    children: PreviewProps[]; // any other preview element
    borders?: boolean; // sets borders around the layout to visually group its children
    borderRadius?: number; // integer. Can be used to create rounded borders
    backgroundColor?: string; // HTML color, formatted #RRGGBB
    borderWidth?: number; // sets the border width
    padding?: number; // integer. adds padding around the container
};

type RowLayoutProps = ContainerProps & {
    type: "RowLayout";
    columnSize?: "fixed" | "grow"; // default is fixed
};

type TextProps = BaseProps & {
    type: "Text";
    content: string; // text that should be shown
    fontSize?: number; // sets the font size
    fontColor?: string; // HTML color, formatted #RRGGBB
    bold?: boolean;
    italic?: boolean;
};

type DropZoneProps = BaseProps & {
    type: "DropZone";
    property: object; // widgets property object from Values API
    placeholder: string; // text to be shown inside the dropzone when empty
    showDataSourceHeader?: boolean; // true by default. Toggles whether to show a header containing information about the datasource
};

type SelectableProps = BaseProps & {
    type: "Selectable";
    object: object; // object property instance from the Value API
    child: PreviewProps; // any type of preview property to visualize the object instance
};

type DatasourceProps = BaseProps & {
    type: "Datasource";
    property: object | null; // datasource property object from Values API
    child?: PreviewProps; // any type of preview property component (optional)
};

export type PreviewProps =
    | ImageProps
    | ContainerProps
    | RowLayoutProps
    | TextProps
    | DropZoneProps
    | SelectableProps
    | DatasourceProps;

export function getProperties(
    _values: AdvancedDatePickerPreviewProps,
    defaultProperties: Properties /* , target: Platform*/
): Properties {
    if (_values.specificDaysMode === "OFF") {
        hidePropertiesIn(defaultProperties, _values, ["specificDaysDatasource", "specificDaysAttribute"]);
    }
    if (_values.intervalDaysMode === "OFF") {
        hidePropertiesIn(defaultProperties, _values, [
            "intervalDaysDatasource",
            "intervalDaysStart",
            "intervalDaysEnd"
        ]);
    }
    if (_values.specificTimesMode === "OFF") {
        hidePropertiesIn(defaultProperties, _values, ["specificTimesDatasource", "specificTimeAttribute"]);
    }
    if (_values.selectionType === "SINGLE") {
        hidePropertiesIn(defaultProperties, _values, ["startDateAttribute", "endDateAttribute"]);
    } else {
        hidePropertiesIn(defaultProperties, _values, ["dateAttribute", "clearable", "maskInput"]);
    }

    if (!_values.useCustomContent) {
        hidePropertyIn(defaultProperties, _values, "customContent");
    }

    if (
        _values.dateFormat === "MONTH" ||
        _values.dateFormat === "YEAR" ||
        _values.dateFormat === "TIME" ||
        _values.dateFormat === "QUARTER"
    ) {
        hidePropertiesIn(defaultProperties, _values, ["showTodayButton", "todayButtonText"]);
    }

    if (_values.dateFormat === "QUARTER") {
        hidePropertyIn(defaultProperties, _values, "maskInput");
    }

    if (_values.dateFormat !== "CUSTOM") {
        hidePropertyIn(defaultProperties, _values, "customDateFormat");
    }
    // Check if time attributes are not needed
    if (_values.dateFormat !== "CUSTOM" && _values.dateFormat !== "TIME" && _values.dateFormat !== "DATETIME") {
        hidePropertiesIn(defaultProperties, _values, ["timeInterval", "timeCaption"]);
        hidePropertiesIn(defaultProperties, _values, [
            "minTime",
            "maxTime",
            "specificTimesMode",
            "specificTimesDatasource",
            "specificTimeAttribute"
        ]);
    }
    if (!_values.showTodayButton) {
        hidePropertyIn(defaultProperties, _values, "todayButtonText");
    }

    if (_values.dateFormat === "TIME") {
        hidePropertiesIn(defaultProperties, _values, [
            "minDate",
            "maxDate",
            "specificDaysMode",
            "specificDaysAttribute",
            "specificDaysDatasource",
            "intervalDaysDatasource",
            "intervalDaysMode",
            "intervalDaysStart",
            "intervalDaysEnd",
            "disableSunday",
            "disableMonday",
            "disableTuesday",
            "disableWednesday",
            "disableThursday",
            "disableFriday",
            "disableSaturday",
            "monthsToDisplay",
            "showPreviousMonth",
            "showWeekNumbers",
            "showArrow",
            "openToDate",
            "monthPrefix",
            "yearSelectLabel",
            "monthSelectLabel",
            "weekPrefix",
            "navigateButtonPrefix",
            "selectPrefix",
            "disabledLabel"
        ]);
    }
    if (_values.dateFormat === "TIME" || _values.dateFormat === "DATETIME") {
        hidePropertyIn(defaultProperties, _values, "selectionType");
    }

    if (!_values.showIcon) {
        hidePropertiesIn(defaultProperties, _values, ["customIcon", "showIconInside", "calendarIconLabel"]);
    }

    if (!_values.showWeekNumbers) {
        hidePropertyIn(defaultProperties, _values, "weekPrefix");
    }

    return defaultProperties;
}

export function check(_values: AdvancedDatePickerPreviewProps): Problem[] {
    const errors: Problem[] = [];
    // Add errors to the above array to throw errors in Studio and Studio Pro.
    // if (_values.minTime !== "" && _values.maxTime === "") {
    //     errors.push({
    //         property: `maxTime`,
    //         message: `If Min Time is set, Max Time is required`,
    //         url: "https://github.com/bsgriggs/mendix-advanced-date-picker/blob/master/README.md"
    //     });
    // } else if (_values.minTime === "" && _values.maxTime !== "") {
    //     errors.push({
    //         property: `minTime`,
    //         message: `If Max Time is set, Min Time is required`,
    //         url: "https://github.com/bsgriggs/mendix-advanced-date-picker/blob/master/README.md"
    //     });
    // }
    return errors;
}

export const getDisplayName = (_values: AdvancedDatePickerPreviewProps): string => {
    function splitAssociationName(str: string): string {
        if (str.includes("/")) {
            // includes an association
            const associationNameRef = str.substring(str.indexOf(".") + 1);
            const arr = associationNameRef.split(".");
            let retString = "";
            for (let i = 0; i < arr.length; i++) {
                if (i === arr.length - 1) {
                    retString += arr[i];
                } else {
                    retString = retString + arr[i].substring(0, arr[i].indexOf("/") + 1);
                }
            }
            return retString;
        } else {
            return str;
        }
    }

    if (_values.selectionType === "SINGLE") {
        return (
            "[" +
            (_values.dateAttribute.length > 0 ? splitAssociationName(_values.dateAttribute) : "No attribute selected") +
            "]"
        );
    } else {
        return (
            "[" +
            (_values.startDateAttribute.length > 0
                ? splitAssociationName(_values.startDateAttribute)
                : "No attribute selected") +
            " - " +
            (_values.endDateAttribute.length > 0
                ? splitAssociationName(_values.endDateAttribute)
                : "No attribute selected") +
            "]"
        );
    }
};

export const getPreview = (_values: AdvancedDatePickerPreviewProps, isDarkMode: boolean): PreviewProps => {
    const mainContent: PreviewProps = {
        type: "RowLayout",
        columnSize: "grow",
        backgroundColor: _values.readOnly ? (isDarkMode ? "#505050" : "#D3D3D3") : isDarkMode ? "#252525" : "#FFFFFF",
        borders: true,
        borderWidth: 1,
        borderRadius: 1,
        children: [
            {
                type: "Container",
                padding: 4,
                grow: 0,
                children: [
                    {
                        type: "Image",
                        width: 20,
                        height: 20,
                        data: "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGwSURBVHgB7ZvNTQMxEIWfQ4g4mgN3OiB0wIE7OdAIlVACJQAVQAehg00H7BHxZzxLjKLI4I2xN45nPmmVKHL8nJeZWdtaAz04gDneh3kYwzzbV7PpNYG5pT5K0yJUnwG9A3PbUON/tHvA6QvUAgVoOUahBp/AdYIBEfoDuEEhWo5gBFBYIR3tG9QhCtByDG0A7KBUCVqOrgHlHoWMVZ/2CcHXnsOcBOXD5NCyTe9s7l9RjVAxhWfXDVjSFcpRwsKza3SFUsXkXSURQLTB22DlaG8ErLqe4l/8re91cmv5+g9GgB6wOugtVKKgASdTJONihmK0fvAtKFZZNMYc6c0XJesX9dE05k9ya/naBg1wA7ucxQ/m/Cz844fQ8n0nWARrIqoI1o4YAOZETYVrQlIAzBEDwJyx70OZCDFCDABzpAgigr5bVymKaW4tSQEwRwwAc8QAMEcMAHNkJogIhlwu59aSFABzxAAwR+4CiED2AypCDABzxAAwRwwAc8QAMEf2A8AcMQDMkecE7dWCMWTAE5hitxru1fLQ5Bz8js59nxuk05P0hk5TggeU8o/udPkX0ggFBHtLbTYAAAAASUVORK5CYII="
                    }
                ]
            },
            {
                type: "RowLayout",
                padding: 4,
                columnSize: "grow",
                grow: 1,
                children: [
                    {
                        type: "Text",
                        fontColor: isDarkMode ? "#579BF9" : "#146FF4",
                        content: getDisplayName(_values)
                    }
                ]
            }
        ]
    };
    const customContent: PreviewProps = {
        type: "RowLayout",
        columnSize: "fixed",
        borders: true,
        children: [
            {
                type: "DropZone",
                property: _values.customContent,
                placeholder: "Place your custom content here"
            }
        ]
    };

    return {
        type: "Container",
        children: [mainContent, ...(_values.useCustomContent ? [customContent] : [])]
    };
};

export function getCustomCaption(_values: AdvancedDatePickerPreviewProps): string {
    return "Advanced Date Picker: " + getDisplayName(_values);
}
