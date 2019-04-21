// @flow

import React from 'react';
import type { Node } from 'react';

import { Month } from './components/Month';
import type { BorderOptions, Weekday } from './types';

type CalendarProps = {|
  year: number,
  month: number,
  locale: string,
  firstWeekday?: Weekday, // This defaults to 0/Sunday.
  renderDay: (date: Date, cellID: string) => Node,
  renderDayHeading?: (dayIndex: Weekday) => Node,
  renderHeading?: () => Node,
  borderOptions?: BorderOptions,
|};

export const Calendar = (props: CalendarProps) => {
  return (
    <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
      {props.renderHeading && props.renderHeading()}
      <Month
        locale={props.locale}
        year={props.year}
        month={props.month}
        firstWeekday={props.firstWeekday || 0}
        renderDay={props.renderDay}
        renderDayHeading={props.renderDayHeading}
        borderOptions={props.borderOptions}
      />
    </div>
  );
};
