## ReactDatePicker

Mendix date picker with most of the customization available in the [React Date Picker](https://reactdatepicker.com/)
library

| Single | Multiple (Range) |  
| ------------- | ------------- |  
| ![Demo](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/Demo.png)      | ![multi](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/multi.png)      |  
| _Example for selecting Date and Time with a Min Date 2023/12/05, 2023/12/25 & 2023/12/29 disabled, and all Saturdays & Sundays disabled_ | |

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
| Single | Multiple (Range) |  
| ------------- | ------------- |  
| ![generalDateSingle](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/generalDateSingle.png)      | ![generalDateMulti](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/generalDateMulti.png)      |  

1. Add the widget inside a date view
2. Configure the Date Format (Date, Month, Quarter, Year, Time, Date and Time, or Custom)
3. Determine if you want the user to set a single date or multiple (aka range) dates
4. Select the attribute you want the user to set
5. Run the Project and customize

## Advanced Usage
The following section will break down each property and how they affect the widget's appearance/logic. 
### General
![generalCustomDateFormat](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/generalCustomDateFormat.png)  
**Date format** - This can be any of the following options. The remainder of the fields in the Format section changed depending on this setting.  
- Date - Uses the date format from the User's language settings (Language -> Language Settings... -> Edit a language -> Date format)
- Month - Uses format MMMM yyyy (e.g. September 2023). If Mask Input is enabled, then uses format MMM yyyy (e.g. Sep 2023)  
![month](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/month.png)  
- Quarter - Uses format yyyy QQQ (e.g. 2023 Q3)  
![quarter](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/quarter.png)  
- Year - Uses format yyyy (e.g. 2023)  
![year](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/year.png)  
- Time - Uses the time format from the User's language settings (Language -> Language Settings... -> Edit a language -> Time format)  
- Date and Time - Uses the Date and Time format from the User's language settings (Language -> Language Settings... -> Edit a language -> Date and time format)
- Custom - Enter any format you want to use into the Custom date format field. The format uses the same symbols as the [Mendix formatDateTime function](https://docs.mendix.com/refguide/parse-and-format-date-function-calls/#1-introduction).

Time, Date and Time, and Custom the following additional fields to control the time dropdown:  
![time](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/time.png)  
**Time interval** - Number of minutes in between each option (default 15 minutes)  
**Time caption** - Text shown in the Time dropdown  

**Selection type** - Controls if the widget is meant to pick a single date or a range of dates.  
_Note: Multiple date mode only supports Date, Month, Quarter, and Year. Custom is only supported if the date format does not include a time character_

### Selectable Dates
![SelectableDates](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/SelectableDates.png)  



### Selectable Times
![SelectableTimes](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/SelectableTimes.png)  

### Customization
![Customization](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/Customization.png)  

### Events
![Events](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/events.png)  

### Common
![Common](https://github.com/bsgriggs/mendix-react-date-picker/blob/media/Common.png)  


| "Custom" - Studio Pro | "Custom" - Browser |  
| ------------- | ------------- |  
| ![studioProOptionContentType](https://github.com/bsgriggs/mendix9-searchable-reference-selector/blob/media/v4/optionContentTypeCustom.png)    | ![BrowserOptionContentType](https://github.com/bsgriggs/mendix9-searchable-reference-selector/blob/media/v4/optionContentTypeCustomUI.png)    |  
| *This image is for a reference set, but the idea is the same* | *This image is for a reference set, but the idea is the same* |  

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
