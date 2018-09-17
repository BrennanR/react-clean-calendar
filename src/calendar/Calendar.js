// @flow

import React from 'react';
import type { Node } from 'react';

import { Month } from './components/Month';
import type { BorderOptions } from "./types";

type CalendarProps = {|
  year: number,
  month: number,
  locale: string,
  renderDay: (date: Date, cellID: string) => Node,
  renderDayHeading?: (dayIndex: number) => Node,
  renderHeading?: () => Node,
  borderOptions?: BorderOptions,
  // Since you can render the day as you please, onDayPress is a convenience method. You can implement your own 
  // onPress logic within you renderDay method, if you'd prefer.
  onDayPress?: (date: Date, cellID: string) => void,
|};

export const Calendar = (props: CalendarProps) => {
  return (
    <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
      { props.renderHeading && props.renderHeading() }
      <Month
        locale={props.locale}
        year={props.year}
        month={props.month}
        firstWeekday={props.firstWeekday}
        renderDay={props.renderDay}
        renderDayHeading={props.renderDayHeading}
        onDayPress={props.onDayPress}
        borderOptions={props.borderOptions}
      />
    </div>
  );
};
