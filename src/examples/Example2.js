// @flow

import React, { Component } from 'react';

import { Calendar } from '../calendar/Calendar';
import { DefaultHeading } from '../calendar/components/defaults/DefaultHeading';
import { longMonthName, nextMonth, previousMonth } from '../calendar/util/date';

type State = {
  year: number,
  month: number,
};

type Props = {};

/** This example shows a calendar rendered in English with paging implemented via the component's state. */
export class Example2 extends Component<Props, State> {
  locale = "fr-ca";

  constructor(props: Props) {
    super(props);
    const date = new Date();
    this.state = { year: date.getFullYear(), month: date.getMonth() + 1};
  }

  renderHeading = () => {
    return (
      <DefaultHeading
        title={longMonthName(this.locale, this.state.year, this.state.month)}
        onNextMonthClicked={() => {
          const { year, month } = nextMonth(this.state.year, this.state.month);
          this.setState({ year, month });
        }}
        onPreviousMonthClicked={() => {
          const { year, month } = previousMonth(this.state.year, this.state.month);
          this.setState({ year, month });
        }}
      />
    );
  };


  renderDay = (date: Date) => {
    return (
      <div style={{ display: 'flex', flex: 1, justifyContent: `flexStart` }} className="calendar-day">
        <div style={{ display: 'flex', flex: 1, margin: 5 }}>
          {date.getDate()}
        </div>
      </div>
    );
  }

  render() {
    return (
      <Calendar
        locale={this.locale}
        year={this.state.year}
        month={this.state.month}
        renderDay={this.renderDay}
        renderHeading={this.renderHeading}
        borderOptions={{ width: 2, color: "lightgrey" }}
        onNextMonthClicked={(year, month) => this.setState({ year, month })}
        onPreviousMonthClicked={(year, month) => this.setState({ year, month })}
      />
    );
  }
}
