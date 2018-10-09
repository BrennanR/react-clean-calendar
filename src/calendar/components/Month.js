// @flow

import React from 'react';
import type { Node } from 'react';

import { arrayRotate } from '../util/array';
import {
  adjustedDayOffsetBasedOnFirstCalendarWeekday,
  calendarWeeksInMonth,
  firstWeekdayInMonth,
  offsetFromWeekAndDay,
} from '../util/date';
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

const dateOfCalendarWeekAndWeekdayIndex = (year: number, month: number, dayOffset: number) => {
  return new Date(year, month - 1, dayOffset);
};

const borderStyle = (dayIndex: number, weekValue: number, lastWeekValue: number, borderOptions: BorderOptions) => {
  let borderWidth, borderColor;
  if (borderOptions === 'no-border') {
    borderWidth = 0;
    borderColor = 'black';
  } else {
    ({ width: borderWidth, color: borderColor } = borderOptions);
  }
  const borderTop = borderWidth;
  const borderLeft = borderWidth;
  const borderRight = dayIndex === 6 ? borderWidth : 0;
  const borderBottom = weekValue === lastWeekValue ? borderWidth : 0;
  return {
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
    borderColor,
    borderStyle: 'solid',
  };
};

const monthDayOffsetsByWeek = (
  year: number,
  month: number,
  weekdayOfTheFirst: Weekday,
  firstCalendarWeekday: Weekday,
): Array<Array<number>> => {
  const monthWeekIndexes = [...Array(calendarWeeksInMonth(year, month, firstCalendarWeekday)).keys()];
  const orderedMonthWeekdays = dayPerWeekRange(firstCalendarWeekday);
  return monthWeekIndexes.map(weekIndex =>
    orderedMonthWeekdays.map(weekdayValue => {
      const dayOffset = adjustedDayOffsetBasedOnFirstCalendarWeekday(weekdayValue, firstCalendarWeekday);
      return offsetFromWeekAndDay(weekIndex, dayOffset, weekdayOfTheFirst);
    }),
  );
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
  const { year, month, locale, firstWeekday: firstCalendarWeekday, borderOptions } = props;
  const weekdayOfTheFirst = firstWeekdayInMonth(year, month);
  const orderedDaysPerWeek = dayPerWeekRange(firstCalendarWeekday);
  const monthDayOffsetsByWeekForCurrentMonth = monthDayOffsetsByWeek(
    year,
    month,
    weekdayOfTheFirst,
    firstCalendarWeekday,
  );

  return (
    <div className="Month-month">
      {props.renderDayHeading && (
        <WeekdayHeadings weekdays={orderedDaysPerWeek} locale={locale} renderDayHeading={props.renderDayHeading} />
      )}
      {monthDayOffsetsByWeekForCurrentMonth.map((dayOffsetsForWeek, weekIndex) => (
        <div key={`${year}-${month}-${weekIndex}`} id={`Month-week-${weekIndex}`} className="Month-week">
          {dayOffsetsForWeek.map((dayOffset, dayIndex) => {
            const cellDate = dateOfCalendarWeekAndWeekdayIndex(year, month, dayOffset);
            const cellID = `${weekIndex}-${dayOffset}`;
            return (
              <div
                style={{
                  ...borderStyle(
                    dayIndex,
                    weekIndex,
                    monthDayOffsetsByWeekForCurrentMonth.length - 1,
                    borderOptions || defaultBorderOptions,
                  ),
                }}
                key={`${year}-${month}-${dayOffset}`}
                id={`Month-day-${cellID}`}
                className="Month-day"
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
