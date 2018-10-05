// @flow

import React from 'react';
import type { Node } from 'react';

import { arrayRotate } from '../util/array';
import { calendarWeeksInMonth, firstWeekdayInMonth } from '../util/date';
import './Month.css';
import type { BorderOptions, Weekday } from '../types';

type MonthProps = {|
  year: number,
  month: number,
  locale: string,
  firstWeekday: Weekday,
  renderDay: (date: Date, cellID: string) => Node,
  renderDayHeading: ?(dayIndex: number) => Node,
  onDayPress: ?(date: Date, cellID: string) => void,
  borderOptions?: BorderOptions,
|};

type WeekdayHeadingsProps = {
  locale: string,
  weekdays: Array<Weekday>,
  renderDayHeading: (dayIndex: number) => Node,
};

const dayPerWeekRange = (firstWeekday: Weekday) => arrayRotate([0, 1, 2, 3, 4, 5, 6], firstWeekday);
const defaultBorderOptions: BorderOptions = {
  width: 1,
  color: 'black',
};

const dayOfMonth = (weekOfMonthIndex: number, weekdayIndex: number, weekdayOfTheFirst: number) => {
  return weekOfMonthIndex * 7 + weekdayIndex - weekdayOfTheFirst + 1;
};

const dateOfCalendarWeekAndWeekdayIndex = (year: number, month: number, dayOffset: number) => {
  return new Date(year, month - 1, dayOffset);
};

const borderStyle = (
  dayIndex: number,
  weekIndex: number,
  lastDayIndex: number,
  lastWeekIndex: number,
  borderOptions: BorderOptions,
) => {
  let borderWidth, borderColor;
  if (borderOptions === 'no-border') {
    borderWidth = 0;
    borderColor = 'black';
  } else {
    ({ width: borderWidth, color: borderColor } = borderOptions);
  }
  const borderTop = borderWidth;
  const borderLeft = borderWidth;
  const borderRight = dayIndex === lastDayIndex ? borderWidth : 0;
  const borderBottom = weekIndex === lastWeekIndex ? borderWidth : 0;
  return {
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
    borderColor,
    borderStyle: 'solid',
  };
};

const WeekdayHeadings = (props: WeekdayHeadingsProps) => {
  return (
    <div className="Month-week-header">
      {props.weekdays.map(dayIndex => {
        return (
          <div className="Month-week-header-weekday" key={dayIndex}>
            {props.renderDayHeading && props.renderDayHeading(parseInt(dayIndex, 10))}
          </div>
        );
      })}
    </div>
  );
};

export const Month = (props: MonthProps) => {
  const { year, month, locale, firstWeekday, borderOptions } = props;
  const weekdayOfTheFirst = firstWeekdayInMonth(year, month);
  const weekPerMonthRange = [...Array(calendarWeeksInMonth(year, month, firstWeekday)).keys()];
  const orderedDaysPerWeek = dayPerWeekRange(props.firstWeekday);
  return (
    <div className="Month-month">
      {props.renderDayHeading && (
        <WeekdayHeadings weekdays={orderedDaysPerWeek} locale={locale} renderDayHeading={props.renderDayHeading} />
      )}
      {weekPerMonthRange.map(weekOfMonthIndex => (
        <div key={weekOfMonthIndex} className="Month-week">
          {orderedDaysPerWeek.map(weekdayIndex => {
            const cellDate = dateOfCalendarWeekAndWeekdayIndex(
              year,
              month,
              dayOfMonth(weekOfMonthIndex, weekdayIndex, weekdayOfTheFirst),
            );
            const cellID = `${weekOfMonthIndex}-${weekdayIndex}`;
            return (
              <div
                style={{
                  ...borderStyle(
                    weekdayIndex,
                    weekOfMonthIndex,
                    orderedDaysPerWeek[orderedDaysPerWeek.length - 1],
                    weekPerMonthRange.length - 1,
                    borderOptions || defaultBorderOptions,
                  ),
                }}
                key={weekdayIndex}
                className={`Month-day Month-day-${cellID}`}
                onClick={() => props.onDayPress != null && props.onDayPress(cellDate, cellID)}
              >
                {props.renderDay(cellDate, cellID)}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
