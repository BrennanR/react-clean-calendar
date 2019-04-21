// @flow

import React, { Component } from 'react';
import type { Node } from 'react';

import { Calendar } from '../lib/Calendar';
import { DefaultCalendarHeading } from '../lib/components/defaults/DefaultCalendarHeading';
import { nextMonth, previousMonth } from '../lib/util/date';
import { localizedWeekdayNames, localizedYearMonth } from '../lib/util/localizeDate';

type State = {
  year: number,
  month: number,
};

type Props = {};

export class Example5 extends Component<Props, State> {
  locale = 'en-us';
  localizedWeekdayNames = localizedWeekdayNames(this.locale, 'short');

  constructor(props: Props) {
    super(props);
    const date = new Date();
    this.state = { year: date.getFullYear(), month: date.getMonth() + 1 };
  }

  renderHeading = () => {
    return (
      <DefaultCalendarHeading
        title={localizedYearMonth(this.locale, 'long', 'numeric', this.state.year, this.state.month)}
        onNextMonthClicked={() => this.setState({ ...nextMonth(this.state.year, this.state.month) })}
        onPreviousMonthClicked={() => this.setState({ ...previousMonth(this.state.year, this.state.month) })}
      />
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
        year={this.state.year}
        month={this.state.month}
        locale={this.locale}
        firstWeekday={1} // 1 = Monday
        renderDay={this.renderDay}
        renderDayHeading={this.renderDayHeading}
        renderHeading={this.renderHeading}
        borderOptions={{ width: 2, color: 'lightgrey' }}
      />
    );
  }
}
