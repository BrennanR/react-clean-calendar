// @flow

import React from 'react';
import type { Node } from 'react';

import { Month } from './components/Month';
import { Pager } from './components/Pager';
import { nextMonth, previousMonth } from './util/date';
import type { BorderOptions } from "./types";

type CalendarProps = {
  year: number,
  month: number,
  locale: string,
  renderDay: (date: Date, cellID: string) => Node,
  borderOptions?: BorderOptions,
  // Since you can render the day as you please, onDayPress is a convenience method. You can implement your own 
  // onPress logic within you renderDay method, if you'd prefer.
  onDayPress?: (date: Date, cellID: string) => void,
  onNextMonthClicked: (year: number, month: number) => void,
  onPreviousMonthClicked: (year: number, month: number) => void,
};

export const Calendar = (props: CalendarProps) => {
  const firstOfMonth = new Date(props.year, props.month-1, 1); // Convert from 1-indexed to 0-indexed.
  return (
    <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
      <Pager 
        title={firstOfMonth.toLocaleDateString(props.locale, { month: "long", year: "numeric" })}
        onNextMonthClicked={() => {
          const { year, month } = nextMonth(props.year, props.month);
          props.onNextMonthClicked(year, month);
        }}
        onPreviousMonthClicked={() => {
          const { year, month } = previousMonth(props.year, props.month);
          props.onPreviousMonthClicked(year, month);
        }}
      />
      <Month
        locale={props.locale}
        year={props.year}
        month={props.month}
        renderDay={props.renderDay}
        onDayPress={props.onDayPress}
        borderOptions={props.borderOptions}
      />
    </div>
  );
};
