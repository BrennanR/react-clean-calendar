// @flow

import React, { Component } from 'react';
import type { Node } from 'react';

import { Calendar } from '../calendar/Calendar';
import { DefaultHeading } from '../calendar/components/defaults/DefaultHeading';
import { nextMonth, previousMonth } from '../calendar/util/date';
import { localizedWeekdayNames, localizedYearMonth } from '../calendar/util/localizeDate';

type State = {
  year: number,
  month: number,
};

type Props = {};

/** This example demonstrates Monday as the start of the week. */
// TODO: Make this demo demonstrate Monday as the start of the week.
export class Example5 extends Component<Props, State> {
  locale = "en-ca";
  localizedWeekdayNames = localizedWeekdayNames(this.locale, "short");

  constructor(props: Props) {
    super(props);
    const date = new Date();
    this.state = { year: date.getFullYear(), month: date.getMonth() + 1};
  }

  renderHeading = () => {
    return (
      <DefaultHeading
        title={localizedYearMonth(this.locale, "long", "numeric", this.state.year, this.state.month)}
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

  renderDayHeading = (dayIndex: number): Node => (
    <div>{this.localizedWeekdayNames[dayIndex]}</div>
  );

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
        year={this.state.year}
        month={this.state.month}
        locale={this.locale}
        firstWeekday={1}
        renderDay={this.renderDay}
        renderDayHeading={this.renderDayHeading}
        renderHeading={this.renderHeading}
        borderOptions={{ width: 2, color: "lightgrey" }}
      />
    );
  }
}
