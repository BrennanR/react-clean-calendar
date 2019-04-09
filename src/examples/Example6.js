// @flow

import React, { Component } from 'react';
import type { Node } from 'react';

import { Calendar } from '../lib/Calendar';
import { DefaultCalendarHeading } from '../lib/components/defaults/DefaultCalendarHeading';
import { nextMonth, previousMonth } from '../lib/util/date';
import { localizedWeekdayNames, localizedYearMonth } from '../lib/util/localizeDate';

type Event = {
  date: string,
  description: string,
};

type State = {
  year: number,
  month: number,
  selectedCellIDs: Array<string>,
  events: Array<Event>,
};

type Props = {};

export class Example6 extends Component<Props, State> {
  locale = 'en-us';
  localizedWeekdayNames = localizedWeekdayNames(this.locale, 'long');

  constructor(props: Props) {
    super(props);
    const date = new Date();
    this.state = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      selectedCellIDs: [],
      events: [
        { date: '2019-04-15', description: 'Pay Day' },
        { date: '2019-04-15', description: "Doctor's Appointment" },
        { date: '2019-04-28', description: "Carl's Birthday" },
      ],
    };
  }

  onDayPress = (date: Date, cellID: string) => {
    if (this.state.selectedCellIDs.indexOf(cellID) !== -1) {
      this.setState({ selectedCellIDs: this.state.selectedCellIDs.filter(cID => cID !== cellID) });
    } else {
      this.setState({ selectedCellIDs: [...this.state.selectedCellIDs, cellID] });
    }
  };

  eventsOnDate = (date: Date) => {
    return this.state.events.filter(event => event.date === date.toISOString().substring(0, 10));
  };

  renderDay = (date: Date, cellID: string, selectedYear: number, selectedMonth: number) => {
    const dayNumber = date.getDate();
    const dayText =
      dayNumber === 1 ? `${date.toLocaleDateString(this.locale, { month: 'short' })} ${dayNumber}` : dayNumber;
    const selectedMonthStartDate = new Date(selectedYear, selectedMonth - 1, 1); // first day of month.
    const selectedMonthEndDate = new Date(selectedYear, selectedMonth, 0); // last day of month.
    const dayIsInSelectedMonth = date >= selectedMonthStartDate && date <= selectedMonthEndDate;
    const isToday = new Date().toDateString() === date.toDateString();
    let color = `grey`;
    let fontWeight = `normal`;
    if (isToday) {
      color = `black`;
      fontWeight = `bold`;
    } else if (dayIsInSelectedMonth) {
      color = `black`;
    }
    const events = this.eventsOnDate(date);
    const backgroundColor = this.state.selectedCellIDs.indexOf(cellID) !== -1 ? `yellow` : `white`;
    return (
      <div
        style={{
          width: `100%`,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          userSelect: 'none',
          backgroundColor,
        }}
        className="calendar-day"
      >
        <div style={{ display: 'flex', flex: 1, margin: 5, color, fontWeight }}>{dayText}</div>
        <div
          style={{
            minWidth: 0,
            width: `100%`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: `center`,
            justifyContent: `center`,
          }}
        >
          {events.map(event => (
            <div
              key={`${event.date}${event.description}`}
              style={{
                display: 'flex',
                justifyContent: `center`,
                width: `90%`,
                backgroundColor: `#33B679`,
                color: `white`,
                borderRadius: 5,
                marginBottom: 5,
                paddingTop: 3,
                paddingBottom: 3,
              }}
            >
              <div
                style={{
                  width: `90%`,
                  whiteSpace: `nowrap`,
                  overflow: `hidden`,
                  textOverflow: `ellipsis`,
                  fontSize: 12,
                  fontWeight: `bold`,
                }}
              >
                {event.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  renderDayHeading = (dayIndex: number): Node => <div>{this.localizedWeekdayNames[dayIndex]}</div>;

  renderHeading = () => {
    return (
      <DefaultCalendarHeading
        title={localizedYearMonth(this.locale, 'long', 'numeric', this.state.year, this.state.month)}
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

  render() {
    return (
      <Calendar
        locale={this.locale}
        year={this.state.year}
        month={this.state.month}
        renderDay={(date, cellID) => this.renderDay(date, cellID, this.state.year, this.state.month)}
        renderDayHeading={this.renderDayHeading}
        renderHeading={this.renderHeading}
        borderOptions={{ width: 0.5, color: 'black' }}
        onDayPress={this.onDayPress}
      />
    );
  }
}
