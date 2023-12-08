## ReactDatePicker

Mendix date picker with most of the customization available in the [React Date Picker](https://reactdatepicker.com/)
library, full control of which dates/times are selectable, and input masking.

| Single                                                                            | Range                                                                    |
| --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| ![Demo](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/Demo.png) | ![range](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/range.png) |

_Single example is selecting Date and Time with a Min Date 2023/12/05, 2023/12/25 & 2023/12/29 disabled, and all
Saturdays & Sundays disabled_

Want to help with translations & accessibility? Submit an issue on [GitHub](https://github.com/bsgriggs/mendix-react-date-picker/issues)
with your language code & translations in the following format.  
| Code | Time caption | Today button text | Calendar icon text | Navigate button prefix | Select prefix | Week prefix | Month prefix | Month select label | Year select label | Disabled label | Clear button label |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| en_US | Time | Today | Toggle calendar | Show | Select | Week | Month | Select Month | Select Year | Not selectable | Clear |

## Features

-   Selects Dates, Months, Quarters, Years, Time, Date & Time, or a Custom Date Format
-   Defaults the format to your Mendix date format settings (Language -> Language Settings -> Select a Language)
-   Can select a range of Dates, Months, Quarters, and Years
-   Dropdown for selecting Times with a customizable interval
-   Control the selectable days using min date, max date, a specific list of days (include or exclude), ranges of days
    (include or exclude), and disable days of the week
-   Control the selectable times using min time, max time, and a specific list of times (include or exclude)

-   Further Customizations:
    -   Clearable
    -   Open to a specific date
    -   Apply an input mask, so the user doesn't need to enter spaces, dashes, or slashes (WIP)
    -   Add custom content inside the date picker (i.e. a button that sets tomorrow)
    -   Show, hide, or customize the Icon next to the text box
    -   Show multiple months at once going either forward or backward
    -   Show the calendar directly on the page instead of in a popup
    -   Display the week numbers
    -   Display an arrow to the text box
    -   Align the popup to the start or end of the text box

Planned Features:

-   highlight dates (data source with attr and optional class name expression)
-   holidays (data source with date and string attr) (Shows tooltip)
-   auto-magically detect if custom date format should use Month, Quarter, or Year pickers

## Basic Usage

| Single                                                                                                      | Range                                                                                          |
| ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| ![generalDateSingle](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/generalDateSingle.png) | ![generalDateMulti](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/generalDateMulti.png) |

1. Add the widget inside a date view
2. Configure the Date Format (Date, Month, Quarter, Year, Time, Date and Time, or Custom)
3. Determine if you want the user to set a single date or multiple (aka range) dates
4. Select the attribute you want the user to set
5. Run the Project and customize

## Advanced Usage

The following section will break down each property and how they affect the widget's appearance/logic.

### General

![generalCustomDateFormat](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/generalCustomDateFormat.png)  
**Date format** - This can be any of the following options. The remainder of the fields in the Format section changed
depending on this setting.

-   Date - Uses the date format from the User's language settings (Language -> Language Settings... -> Edit a language
    -> Date format)
-   Month - Uses format MMMM yyyy (e.g. September 2023). If Mask Input is enabled, then uses format MMM yyyy (e.g.
    Sep 2023)  
    ![month](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/month.png)
-   Quarter - Uses format yyyy QQQ (e.g. 2023 Q3)  
    ![quarter](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/quarter.png)
-   Year - Uses format yyyy (e.g. 2023)  
    ![year](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/year.png)
-   Time - Uses the time format from the User's language settings (Language -> Language Settings... -> Edit a language
    -> Time format)
-   Date and Time - Uses the Date and Time format from the User's language settings (Language -> Language Settings... ->
    Edit a language -> Date and time format)
-   Custom - Enter any format you want to use into the Custom date format field. The format uses the same symbols as the
    [Mendix formatDateTime function](https://docs.mendix.com/refguide/parse-and-format-date-function-calls/#1-introduction).

Time, Date and Time, and Custom the following additional fields to control the time dropdown:  
![time](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/time.png)  
**Time interval** - Number of minutes in between each option (default 15 minutes)  
**Time caption** - Text shown in the Time dropdown

**Selection type** - Controls if the widget is meant to pick a single date or a range of dates.  
| Single | Range |  
| ------------- | ------------- |  
| ![Demo](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/Demo.png) | ![range](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/range.png) |

_Note: Multiple date mode only supports Date, Month, Quarter, and Year. Custom is only supported if the date format does
not include a time character_

### Selectable Dates

![SelectableDates](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/SelectableDates.png)

**Min date** - Date expression. The earliest selectable date (inclusive)  
**Max date** - Date expression. The latest selectable date (inclusive)

**Specific Days** - Supply the widget with a list of dates. For Inclusive mode, the provided dates are the only dates
that can be selected. For Exclusive mode, the provided dates cannot be selected.

In your data model, you must have an entity with a **non-localized** date. In some situations, you would have a
persistent entity and retrieve from database (i.e. a list of Holidays the users have to maintain). Other times, you
could use a non-persistent entity if the list of dates is based on a calculation/dynamic (i.e. every 2nd Monday isn't
selectable). The widget will automatically filter out specific days outside the Min and Max dates.  
| Domain | Widget Properties |  
| ------------- | ------------- |  
| ![specificDaysDomain](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/specificDaysDomain.png) | ![specificDays](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/specificDays.png) |

**Interval Days** - Supply the widget with a list of ranges of dates. For Inclusive mode, the provided ranges are the
only dates that can be selected. For Exclusive mode, the provided ranges cannot be selected.

In your data model, you must have an entity with two **non-localized** dates. In some situations, you would have a
persistent entity and retrieve from database (i.e. a list of school breaks). Other times, you could use a non-persistent
entity for a non-standard interval (i.e. the second week of every month isn't selectable). The widget will automatically
filter out interval days outside the Min and Max dates.  
| Domain | Widget Properties |  
| ------------- | ------------- |  
| ![intervalDaysDomain](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/intervalDaysDomain.png) | ![intervalDays](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/intervalDays.png) |

**Disable Sunday -> Disable Saturday** - These fields are boolean expressions. When true, the user is no longer able to
pick that day of the week.

### Selectable Times

![SelectableTimes](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/SelectableTimes.png)  
This tab will only show if the date picker has a date format that includes a time (i.e. Time, Date and Time, or Custom
with 'H', 'h', 'm', 's', 'a', or 'z'.

**Min time** - Date expression. The earliest selectable time (inclusive). If Max Time is set, Min Time is required.  
**Max time** - Date expression. The latest selectable time (inclusive). If Min Time is set, Max Time is required.

**Specific Times** - Supply the widget with a list of times. For Inclusive mode, the provided times are the only times
that can be selected. For Exclusive mode, the provided times cannot be selected.

In your data model, you must have an entity with a **localized** date. The widget will only read the time from this
attribute. In some situations, you would have a persistent entity and retrieve from database (i.e. remove times that
have already been scheduled). Other times, you could use a non-persistent entity (i.e. times between noon and 1 pm are
not selectable).

| Domain                                                                                                          | Widget Properties                                                                                   |
| --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| ![specificTimesDomain](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/specificTimesDomain.png) | ![specificTimes](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/specificTimes.png) |

### Customization

![Customization](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/Customization.png)

**Clearable** - Boolean expression. When true and there is a value already selected, a blue X icon will appear to the
right of the date allowing the user to quickly reset the widget. When false, there will be no icon and the user cannot
empty the date via the textbox.  
**Open to date** - Date expression. Controls which date is focused when the popper opens. Can be used to control what is
being displayed while the popper is open (i.e. with Use Custom Content enabled, you could have buttons that move the
date picker +/- 1 year.)  
**Mask input** - Applies and input mask based on the Date Format. When enabled, the user does not have to enter slashes,
spaces, colons, or dashes. It **ONLY** works with date formats that always display the same number of characters as the
format itself (i.e. yyyy MMM dd works but yyyy MMMM dd does not work because there is no way to enter 'May'). It also
does not work with the Quarter picker because the format is yyyy QQQ but displays as yyyy QQ.  
![mask](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/mask.png)  
**Use custom content** - When enabled, a new container will appear in Studio Pro to put any content inside. Most useful
in combination with Open to Date to create controls that change the month being displayed.  
![customContent](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/customContent.png)  
**Icons** - Control whether or not to show the calendar icon. If it is being shown, choose to display the icon as a
button on the side or inside the input. A custom icon can be selected.  
![icon](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/icon.png)  
**Today button** - Control whether or not to show the today button and the text of the button.  
![todayButton](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/todayButton.png)  
**Month display** - Control how many months are displayed at a time and a boolean expression that controls if the widget
goes backward (true) or forward (false DEFAULT) from the current date/Open to Date.  
| Show Previous Month 'False' | Show Previous Month 'True' |  
| ------------- | ------------- |  
| ![monthDisplayForward](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/monthDisplayForward.png) | ![monthDisplayBackward](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/monthDisplayBackward.png) |

**Show inline** - When true, the calendar is rendered directly on the page instead of an input with a popup.  
![showInline](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/showInline.png)  
**Show week numbers** - When true, the day calendar will show week numbers as a column inside the popup.  
![showWeekNumbers](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/showWeekNumbers.png)  
**Show arrow** - When true, shows a small arrow pointing the calendar to the input.  
![showArrow](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/showArrow.png)  
**Alignment** - Determines which side the popup is aligned with on the text box.  
| Left (Default) | Right | Auto |  
| ------------- | ------------- | ------------- |  
| ![alignRight](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/alignRight.png) | ![alignLeft](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/alignLeft.png) | ![alignAuto](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/alignAuto.png) |

### Events

![Events](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/events.png)  
**On change** - Runs when the date attribute changes. For Selection Type "Multiple", it will only run when the end date
is changed.  
**On enter** - Runs when the date picker popup opens. For customization 'Show Inline', it will only run if the date
picker received focus.  
**On leave** - Runs when the date picker popup closes. For customization 'Show Inline', it will only run if the date
picker received and then lost focus.

### Accessibility

![Accessibility](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/Accessibility.png)  

Want to help with translations & accessibility? Submit an issue on [GitHub](https://github.com/bsgriggs/mendix-react-date-picker/issues)
with your language code & translations in the following format.  
| Code | Time caption | Today button text | Calendar icon text | Navigate button prefix | Select prefix | Week prefix | Month prefix | Month select label | Year select label | Disabled label | Clear button label |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| en_US | Time | Today | Toggle calendar | Show | Select | Week | Month | Select Month | Select Year | Not selectable | Clear |

### Common

![Common](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/Common.png)

## Demo project

https://widgettesting105-sandbox.mxapps.io/p/react-date-picker

## Issues, suggestions and feature requests

https://github.com/bsgriggs/mendix-react-date-picker/issues

## Development and contribution

1. Install NPM package dependencies by using: `npm install`. If you use NPM v8.19.x, which can be checked by executing
   `npm -v`, execute: `npm install --legacy-peer-deps`.
2. Run `npm start` to watch for code changes. On every change:
    - the widget will be bundled;
    - the bundle will be included in a `dist` folder in the root directory of the project;
    - the bundle will be included in the `deployment` and `widgets` folder of the Mendix test project.

Benjamin Griggs
