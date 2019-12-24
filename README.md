# React Clean Calendar [![npm version](https://badge.fury.io/js/react-clean-calendar.png)](https://badge.fury.io/js/react-clean-calendar)

<img src="https://raw.githubusercontent.com/BrennanR/example-media/master/react-clean-calendar/react-clean-calendar-animated-paging.gif" alt="animated paging" width="400" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://raw.githubusercontent.com/BrennanR/example-media/master/react-clean-calendar/react-clean-calendar-day-events.png" alt="day events" width="400" />

A number of examples and recipes can be found here: [Examples and Recipes](https://brennanr.github.io/react-clean-calendar/).

`react-clean-calendar` is a light-weight react calendar component that primarily aims to solve the date-math involved
in rendering a calendar. The component, given a year, month, and 'first day of the week' (eg. traditionally Sunday in 
North America, Monday in Europe) will render enough rows to display each day of the calendar month.

The calendar provides little to no styling for content inside of day cells. A `renderDay` prop is provided that lets
you control and render the day exactly how you'd like.

## Getting Started

The easiest way to get started with this library is to browse the [examples and recipes](https://brennanr.github.io/react-clean-calendar/) and their associated source code.

## Exports

Note: this library uses 1-indexed month values (1=Jan, 12=Dec).

### Calendar
- The main react calendar component.

#### Available Props
| Name              | Required | Type                             | Description |
|-------------------|----------|----------------------------------|------------------------------------------------------|
| year              | yes | number                                | The current calendar year to show.                    |
| month             | yes | number                                | The current calendar month to show, 1-12.             |
| locale            | yes | string                                | A string with a BCP 47 language tag, or an array of such strings. See [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString#Parameters).|
| renderDay         | yes | (date: Date, cellID: string) => Node  | A render function to render one calendar day's contents. |
| firstWeekday      | no  | Weekday                               | The day of the week represented by the first calendar column. This defaults to 0. Weekday is an enum of 0-6, 0-Sun, 6-Sat. |
| renderDayHeading  | no  | (dayIndex: number) => Node            | A render function to render a heading for the day of the week columns. dayIndex is an enum of 0-6, 0-Sun, 6-Sat.  |
| renderHeading     | no  | () => Node                            | A render function to render a heading for the entire calendar. Typically this is where your buttons to page between months should go. |
| borderOptions     | no  | BorderOptions                         | Either the string "no-border" or an object `{color: string, width: number }`. For advanced usages you may want to implement border rendering in the `renderDay` prop. |

Examples:

```JSX
import React, { Component } from 'react';
import { Calendar } from 'react-clean-calendar';

const App = (props) => {
  return (
    <Calendar
      locale="en-us"
      year={2019}
      month={1}
      renderDay={(date, cellID) => <div>{date.toString()}</div>}
    />
  );
}
```

### DefaultCalendarHeading
- A react component calendar heading. This is a simple implementation to get started with. It includes pagination buttons and a title.
- To use this you'll want to implement the `Calendar` component's `renderHeading` render prop. In that render function use this component. Many of the [examples](https://github.com/BrennanR/react-clean-calendar/tree/master/src/examples) demonstrate how to do this.

#### Available Props
| Name              | Required | Type                             | Description |
|-------------------|----------|----------------------------------|------------------------------------------------------|
| title | yes | string | A title for the month. It will be centered. |
| onNextMonthClicked | yes | () => void | A function to call when the user clicks the next month button. |
| onPreviousMonthClicked | yes | () => void | A function to call when the user clicks the previous month button. |

Examples:

```JSX
<DefaultCalendarHeading
  title={localizedYearMonth(this.locale, 'long', 'numeric', this.state.year, this.state.month)}
  onNextMonthClicked={() => this.setState({ ...nextMonth(this.state.year, this.state.month) })}
  onPreviousMonthClicked={() => this.setState({ ...previousMonth(this.state.year, this.state.month) })}
/>
```

### localizedWeekdayNamesStartingWith

- Provided with a locale and format, this will return weekday names you can display as calendar day headings.

```javascript
localizedWeekdayNamesStartingWith(
  locale: string,
  format: WeekdayFormat,
  startingWeekDay: Weekday,
)
```

Examples:

```javascript
localizedWeekdayNamesStartingWith('en-us', 'long', 0)

=> ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
```

```javascript
localizedWeekdayNamesStartingWith('en-us', 'long', 1)

=> ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
```

### localizedYearMonth

- Provided with a locale, format, year, and month, this will return a localized string. This can be used as a heading
for the entire calendar.

```javascript
localizedYearMonth(
  locale: string,
  monthFormat: MonthFormat,
  yearFormat: YearFormat,
  year: number,
  month: number,
)
```

Examples:

```javascript
localizedYearMonth('en-us', 'short', 'numeric', 2019, 1)

=> Jan 2019
```

### nextMonth
- Given a year/month, returns an object containing the next year/month.

```javascript
nextMonth(
  year: number,
  month: number,
)
```


Examples:

```javascript
nextMonth(2019, 12)

=> { year: 2020, month: 1 }
```

### previousMonth
- Given a year/month, returns an object containing the previous year/month.

```javascript
previousMonth(
  year: number,
  month: number,
)
```

Examples:

```javascript
previousMonth(2020, 1)

=> { year: 2019, month: 12 }
```

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

## Supported Browsers

| Browser | Tested Version |
|---------|----------------|
| IE      | 11             |
| Edge    | Latest         |
| Chrome  | Latest         |
| Firefox | Latest         |
| Safari  | Latest         |

These are the browser's that I _attempt_ to support. Please note that this is a project I work on in spare time and I can't guarantee my ability to always thoroughly test on every browser.

Older versions of Chrome, Edge, and Firefox will almost certainly work, however I do not test with anything except the latest version of those browsers.

If you encounter any issues with any of the listed browser please open an issue.

While I don't actively test with mobile browsers, please file any issues with any modern mobile browsers as well.

NOTE: babel-polyfill is used on the example site to support IE11 for some examples. It shouldn't be needed to use the library with IE11, however.

## UMD

The UMD module uses the global variable `RCCal`. See this codepen for an example of the calendar using UMD imports for react, react-dom, react-clean-calendar, and babel.

https://codepen.io/broar/pen/GeGpgV

Note: In production I don't recommend importing the project this way. I recommend downloading it through npm and building it into your project with webpack (or any other JS build tool). However, the UMD module can be imported to quickly prototype or get started with the calendar.

## License
The project is licensed under The MIT License. See LICENSE.md for details.
