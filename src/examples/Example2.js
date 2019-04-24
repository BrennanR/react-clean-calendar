// @flow

import React, { Component } from 'react';
import type { Node } from 'react';

import { Calendar } from '../lib/Calendar';
import { nextMonth, previousMonth } from '../lib/util/date';
import { localizedWeekdayNames, localizedYearMonth } from '../lib/util/localizeDate';

type State = {
  year: number,
  month: number,
};

type Props = {};

/** This example shows a calendar rendered in English with paging implemented via the component's state. */
export class Example2 extends Component<Props, State> {
  locale = 'fr-ca';
  localizedWeekdayNames = localizedWeekdayNames(this.locale, 'short');

  constructor(props: Props) {
    super(props);
    const date = new Date();
    this.state = { year: date.getFullYear(), month: date.getMonth() + 1 };
  }

  renderHeading = () => {
    return (
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: 5, marginBottom: 5 }}>
        <div style={{ marginLeft: 10, fontSize: 20 }}>
          {localizedYearMonth(this.locale, 'long', 'numeric', this.state.year, this.state.month)}
        </div>
        <div style={{ marginRight: 10 }}>
          <button
            style={{ color: `red` }}
            onClick={() => {
              const { year, month } = previousMonth(this.state.year, this.state.month);
              this.setState({ year, month });
            }}
          >
            {'<<<'}
          </button>
          <button
            style={{ color: `purple` }}
            onClick={() => {
              const { year, month } = nextMonth(this.state.year, this.state.month);
              this.setState({ year, month });
            }}
          >
            {'>>>'}
          </button>
        </div>
      </div>
    );
  };

  renderDayHeading = (dayIndex: number): Node => <div>{this.localizedWeekdayNames[dayIndex]}</div>;

  renderDay = (date: Date) => {
    return (
      <div style={{ display: 'flex', flex: 1, justifyContent: `flexStart` }} className="calendar-day">
        <div style={{ display: 'flex', flex: 1, margin: 5 }}>{date.getDate()}</div>
      </div>
    );
  };

  render() {
    return (
      <Calendar
        locale={this.locale}
        year={this.state.year}
        month={this.state.month}
        renderDay={this.renderDay}
        renderDayHeading={this.renderDayHeading}
        renderHeading={this.renderHeading}
        borderOptions={{ width: 2, color: 'lightgrey' }}
      />
    );
  }
}
