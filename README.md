## ReactDatePicker

Mendix date picker with most of the customization available in the [React Date Picker](https://reactdatepicker.com/)
library

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

## Usage

[step by step instructions]

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
