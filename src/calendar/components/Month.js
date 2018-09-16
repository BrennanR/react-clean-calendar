// @flow

import React from 'react';
import type { Node } from 'react';

import { calendarWeeksInMonth, firstWeekdayInMonth, weekOrderedByGivenFirstWeekday } from "../util/date";
import "./Month.css";
import type { BorderOptions, Weekday } from "../types";


type MonthProps = {
  locale: string,
  year: number,
  month: number,
  renderDay: (date: Date, cellID: string) => Node,
  onDayPress?: (date: Date, cellID: string) => void,
  borderOptions?: BorderOptions,
};

const daysPerWeek = 7;
const defaultBorderOptions: BorderOptions = {
  width: 1,
  color: "black",
};

const dayOfMonth = (weekOfMonthIndex: number, weekdayIndex: number, weekdayOfTheFirst: number) => {
  return (weekOfMonthIndex * 7) + weekdayIndex - weekdayOfTheFirst + 1;
}

const dateOfCalendarWeekAndWeekdayIndex = (year: number, month: number, dayOffset: number) => {
  return new Date(year, month-1, dayOffset);
}

const borderStyle = (dayIndex: number, weekIndex: number, lastWeekIndex: number, borderOptions: BorderOptions) => {
  let borderWidth, borderColor;
  if (borderOptions === "no-border") {
    borderWidth = 0;
    borderColor = "black";
  } else {
    ({ width: borderWidth, color: borderColor } = borderOptions);
  }
  const borderTop = borderWidth;
  const borderLeft = borderWidth;
  const borderRight = dayIndex === 6 ? borderWidth : 0;
  const borderBottom = weekIndex === lastWeekIndex ? borderWidth : 0
  return {
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
    borderColor,
    borderStyle: "solid",
  }
}

const Header = (props: { locale: string, firstWeekday: Weekday }) => {
  return (
    <div className="Month-week-header">
      {weekOrderedByGivenFirstWeekday(props.locale, props.firstWeekday).map(weekdayName =>
        <div className="Month-week-header-weekday" key={weekdayName}>{weekdayName}</div>
      )}
    </div>
  );
}

export const Month = (props: MonthProps) => {
  const weekdayOfTheFirst = firstWeekdayInMonth(props.year, props.month);
  const weekPerMonthRange = [...Array(calendarWeeksInMonth(props.year, props.month, 0)).keys()];
  const dayPerWeekRange = [...Array(daysPerWeek).keys()];
  return (
    <div className="Month-month">
      <Header firstWeekday={0} locale={props.locale} />
      {
        weekPerMonthRange.map(weekOfMonthIndex => (
          <div key={weekOfMonthIndex} className="Month-week">
          {
            dayPerWeekRange.map(weekdayIndex => {
              const cellDate = dateOfCalendarWeekAndWeekdayIndex(
                props.year,
                props.month,
                dayOfMonth(weekOfMonthIndex, weekdayIndex, weekdayOfTheFirst)
              );
              const cellID = `${weekOfMonthIndex}-${weekdayIndex}`;
              return (
                <div 
                  style={{ 
                    ...borderStyle(
                      weekdayIndex,
                      weekOfMonthIndex, 
                      weekPerMonthRange.length - 1, 
                      props.borderOptions || defaultBorderOptions,
                    )
                  }}
                  key={weekdayIndex} 
                  className="Month-day Month-day-{cellID}"
                  onClick={() => props.onDayPress != null && props.onDayPress(cellDate, cellID)}
                >
                  {props.renderDay(cellDate, cellID)}
                </div>
              );
            })
          }
          </div>
        ))
      }
    </div>
  );
};
