// @flow

import React, { Component } from 'react';
import type { Node } from 'react';

import { Calendar } from '../lib/Calendar';
import { nextMonth } from '../lib/util/date';
import { localizedWeekdayNames, localizedYearMonth } from '../lib/util/localizeDate';

type Props = {};

const date = new Date();

export class Example4 extends Component<Props> {
  locale = 'en-us';
  localizedWeekdayNames = localizedWeekdayNames(this.locale, 'narrow');

  year = date.getFullYear();
  month = date.getMonth() + 1;

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
    const { year: secondMonthYear, month: secondMonth } = nextMonth(this.year, this.month);
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
          year={this.year}
          month={this.month}
          renderDay={this.renderDay}
          renderDayHeading={this.renderDayHeading}
          renderHeading={() => this.renderHeading(this.year, this.month)}
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
