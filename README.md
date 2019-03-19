# React Clean Calendar [![npm version](https://badge.fury.io/js/react-clean-calendar.png)](https://badge.fury.io/js/react-clean-calendar)

A number of examples can be found here: [Examples](https://brennanr.github.io/react-clean-calendar/).

`react-clean-calendar` is a light-weight react calendar component that primarily aims to solve the date-math involved
in rendering a calendar. The component, given a year, month, and 'first day of the week' (eg. traditionally Sunday in 
North America, Monday in Europe) will render enough rows to display each day of the calendar month.

The calendar provides little to no styling for content inside of day cells. A `renderDay` prop is provided that lets
you control and render the day exactly how you'd like.

## Example

```
import React, { Component } from 'react';
import { Calendar } from 'react-clean-calendar';

const App = (props) => {
  return (
    <Calendar
      locale={`en-us`}
      year={2019}
      month={1}
      renderDay={(date, cellID) => <div>{date.toString()}</div>}
    />
  );
}
```

Note: all functions and components accept and return 1-indexed month values (1=Jan, 12=Dec).

## Exports

### Calendar
- The main react calendar component.

### DefaultCalendarHeading
- A react component calendar heading. This is a simple implementation to get started with. It includes pagination buttons and a title.

### localizedWeekdayNamesStartingWith(locale: string, format: WeekdayFormat, startingWeekDay: Weekday)
- Provided with a locale and format, this will return weekday names you can display as calendar day headings.
- Eg. 
```
localizedWeekdayNamesStartingWith('en-us', 'long', 0) -> 
  ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
```
- Eg. 
```
localizedWeekdayNamesStartingWith('en-us', 'long', 1) ->
  ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
```

### localizedYearMonth(locale: string, monthFormat: MonthFormat, yearFormat: YearFormat, year: number, month: number)
- Provided with a locale, format, year, and month, this will return a localized string. This can be used as a heading
for the entire calendar.

### nextMonth(year: number, month: number)
- Given a year/month, returns an object containing the next year/month.
- Eg. `nextMonth(2019, 12) -> { year: 2020, month: 1 }`.

### previousMonth(year: number, month: number)
- Given a year/month, returns an object containing the previous year/month.
- Eg. `previousMonth(2020, 1) -> { year: 2019, month: 12 }`.

## Styling
Internally, the calendar uses flex-box to lay itself out. A small amount of CSS is used to style the calendar.
The styling is attached to these classes:

- Month-month
- Month-week
- Month-day
- Month-week-header
- Month-week-header-weekday

You may have to customize or override this default styling if you can't achieve the layout you want because of it.

## Philosophy
`react-clean-calendar` was built to be a fully customizable calendar component. Other projects like
[rc-calendar](https://github.com/react-component/calendar) and
[react-big-calendar](https://github.com/intljusticemission/react-big-calendar) proved too hard to customize, because of
styling decisions they made that could not be simply overidden. If you're searching for a calendar for your project, 
I'd look at those more feature-filled calendars before choosing this one. This calendar simply provides you with data
about days. You're left to render data into those day-cells on your own.

`react-clean-calendar` is meant to be a base for you to build your own custom calendars on top of. There are some
reasonable defaults provided, but by-and-large the style and content implementation details are completely up to you.

`react-clean-calendar` is primarily built and meant to serve as a full-screen calendar component. The focus of this
library is not for building a date-picker, although there's no reason it couldn't be used for that.

React clean calendar has no dependencies beyond `react` and `react-dom`.

## UMD

The UMD module uses the global variable `RCCal`. See this codepen for an example of the calendar using UMD imports for react, react-dom, react-clean-calendar, and babel.

https://codepen.io/broar/pen/GeGpgV

Note: In production I don't recommend importing the project this way. I recommend downloading it through npm and building it into your project with webpack (or any other JS build tool). However, the UMD module can be imported to quickly prototype or get started with the calendar.

## License
The project is licensed under The MIT License. See LICENSE.md for details.
