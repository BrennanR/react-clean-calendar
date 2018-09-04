// @flow

import React from 'react';
import type { Node } from 'react';

import { Month } from './components/Month';
import { Pager } from './components/Pager';
import { nextMonth, previousMonth } from './util/date';

type CalendarProps = {
  year: number,
  month: number,
  renderDay: (date: Date) => Node,
  onNextMonthClicked: (year: number, month: number) => void,
  onPreviousMonthClicked: (year: number, month: number) => void,
};

export const Calendar = (props: CalendarProps) => {
  const firstOfMonth = new Date(props.year, props.month-1, 1); // Convert from 1-indexed to 0-indexed.
  return (
    <div style={{ display: "flex", flex: 1, flexDirection: "column", backgroundColor: "lightgray", }}>
      <Pager 
        title={firstOfMonth.toLocaleDateString("en-us", { month: "long", year: "numeric" })}
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
        year={props.year}
        month={props.month}
        renderDay={props.renderDay}
      />
    </div>
  );
};
