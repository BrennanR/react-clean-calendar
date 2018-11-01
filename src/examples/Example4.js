// @flow

import React, { Component } from 'react';
import type { Node } from 'react';

import { Calendar } from '../lib/Calendar';
import { nextMonth } from '../lib/util/date';
import { localizedWeekdayNames, localizedYearMonth } from '../lib/util/localizeDate';

type State = {
  year: number,
  month: number,
};

type Props = {};

/** This example shows a calendar rendered in English with paging implemented via the component's state. */
export class Example4 extends Component<Props, State> {
  locale = 'en-us';
  localizedWeekdayNames = localizedWeekdayNames(this.locale, 'narrow');

  constructor(props: Props) {
    super(props);
    const date = new Date();
    this.state = { year: date.getFullYear(), month: date.getMonth() + 1 };
  }

  renderDay = (date: Date) => {
    return (
      <div style={{ display: 'flex', flex: 1, justifyContent: `flexStart` }} className="calendar-day">
        <div style={{ display: 'flex', flex: 1, margin: 5 }}>{date.getDate()}</div>
      </div>
    );
  };

  renderHeading = (year: number, month: number): Node => (
    <div style={{ fontSize: 22 }}>{localizedYearMonth(this.locale, 'long', 'numeric', year, month)}</div>
  );

  renderDayHeading = (dayIndex: number): Node => <div>{this.localizedWeekdayNames[dayIndex]}</div>;

  render() {
    const { year: secondMonthYear, month: secondMonth } = nextMonth(this.state.year, this.state.month);
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flex: 1,
          height: 500,
          paddingTop: 40,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <Calendar
          locale={this.locale}
          year={this.state.year}
          month={this.state.month}
          renderDay={this.renderDay}
          renderDayHeading={this.renderDayHeading}
          renderHeading={() => this.renderHeading(this.state.year, this.state.month)}
        />
        <div style={{ width: 20 }} />
        <Calendar
          locale={this.locale}
          year={secondMonthYear}
          month={secondMonth}
          renderDay={this.renderDay}
          renderDayHeading={this.renderDayHeading}
          renderHeading={() => this.renderHeading(secondMonthYear, secondMonth)}
        />
      </div>
    );
  }
}
