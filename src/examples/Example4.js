// @flow

import React, { Component } from 'react';

import { Calendar } from '../calendar/Calendar';
import { longMonthName, nextMonth } from '../calendar/util/date';


type State = {
  year: number,
  month: number,
};

type Props = {};

/** This example shows a calendar rendered in English with paging implemented via the component's state. */
export class Example4 extends Component<Props, State> {
  locale = "en-ca";

  constructor(props: Props) {
    super(props);
    const date = new Date();
    this.state = { year: date.getFullYear(), month: date.getMonth() + 1};
  }

  renderDay = (date: Date) => {
    return (
      <div style={{ display: 'flex', flex: 1, justifyContent: `flexStart` }} className="calendar-day">
        <div style={{ display: 'flex', flex: 1, margin: 5 }}>
          {date.getDate()}
        </div>
      </div>
    );
  }

  renderHeader = (year: number, month: number) => {
    return <div>{longMonthName(this.locale, year, month)}</div>
  }

  render() {
    const { year: secondMonthYear, month: secondMonth } = nextMonth(this.state.year, this.state.month)
    return (
      <div style={{ display: "flex", flexDirection: "row", height: 500, paddingTop: 40 }}>
        <Calendar
          locale={this.locale}
          year={this.state.year}
          month={this.state.month}
          renderDay={this.renderDay}
          renderHeading={() => this.renderHeader(this.state.year, this.state.month)}
        />
        <div style={{ width: 20 }} />
        <Calendar
          locale={this.locale}
          year={secondMonthYear}
          month={secondMonth}
          renderDay={this.renderDay}
          renderHeading={() => this.renderHeader(secondMonthYear, secondMonth)}
        />
      </div>
    );
  }
}
