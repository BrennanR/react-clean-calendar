// @flow

import React from 'react';
import type { Node } from 'react';

import { calendarWeeksInMonth, firstWeekdayInMonth } from "../util/date";
import "./Month.css";

type MonthProps = {
  year: number,
  month: number,
  renderDay: (date: Date) => Node,
};

const daysPerWeek = 7;

const dayOfMonth = (weekOfMonthIndex: number, weekdayIndex: number, weekdayOfTheFirst: number) => {
  return (weekOfMonthIndex * 7) + weekdayIndex - weekdayOfTheFirst + 1;
}

const dateOfCalendarWeekAndWeekdayIndex = (year: number, month: number, dayOffset: number) => {
  return new Date(year, month-1, dayOffset);
}

const borderStyle = (dayIndex, weekIndex, lastWeekIndex) => {
  const borderTop = 1;
  const borderLeft = 1;
  const borderRight = dayIndex === 6 ? 1 : 0;
  const borderBottom = weekIndex === lastWeekIndex ? 1 : 0
  return {
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
    borderStyle: "solid",
    borderColor: "black",
  }
}

export const Month = (props: MonthProps) => {
  const weekdayOfTheFirst = firstWeekdayInMonth(props.year, props.month);
  const weekPerMonthRange = [...Array(calendarWeeksInMonth(props.year, props.month, "Sunday")).keys()];
  const dayPerWeekRange = [...Array(daysPerWeek).keys()];
  return (
    <div className="Month-month">
    {
      weekPerMonthRange.map(weekOfMonthIndex => (
        <div key={weekOfMonthIndex} className="Month-week">
        {
          dayPerWeekRange.map(weekdayIndex => (
            <div 
              style={{ ...borderStyle(weekdayIndex, weekOfMonthIndex, weekPerMonthRange.length - 1)}} 
              key={weekdayIndex} 
              className="Month-day Month-day-{weekdayIndex}"
            >
              {props.renderDay(
                dateOfCalendarWeekAndWeekdayIndex(
                  props.year,
                  props.month,
                  dayOfMonth(weekOfMonthIndex, weekdayIndex, weekdayOfTheFirst)
                )
              )}
            </div>
          ))
        }
        </div>
      ))
    }
    </div>
  );
};
