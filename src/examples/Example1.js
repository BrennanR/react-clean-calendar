// @flow

import React, { Component } from 'react';
import type { Element } from 'react';

import { Calendar } from '../calendar/Calendar';
import { DefaultHeading } from '../calendar/components/defaults/DefaultHeading';
import { nextMonth, previousMonth } from '../calendar/util/date';
import { localizedWeekdayNames, localizedYearMonth } from '../calendar/util/localizeDate';

type State = {
  year: number,
  month: number,
  selectedCellIDs: Array<string>
};

type Props = {};

/** This example shows a calendar rendered in English with clickable days and paging implemented via the 
 *  component's state.
 */
export class Example1 extends Component<Props, State> {
  locale = "en-us";
  localizedWeekdayNames = localizedWeekdayNames(this.locale, "long");

  constructor(props: Props) {
    super(props);
    const date = new Date();
    this.state = { year: date.getFullYear(), month: date.getMonth() + 1, selectedCellIDs: []};
  }

  onDayPress = (date: Date, cellID: string) => {
    if (this.state.selectedCellIDs.indexOf(cellID) !== -1) {
      this.setState({ selectedCellIDs: this.state.selectedCellIDs.filter(cID => cID !== cellID) });
    } else {
      this.setState({ selectedCellIDs: [...this.state.selectedCellIDs, cellID]});
    }
  }

  renderDay = (date: Date, cellID: string, selectedYear: number, selectedMonth: number) => {
    const dayNumber = date.getDate();
    const dayText = dayNumber === 1 ? `${date.toLocaleDateString(this.locale, {month: 'short'})} ${dayNumber}` : dayNumber;
    const selectedMonthStartDate = new Date(selectedYear, selectedMonth - 1, 1); // first day of month.
    const selectedMonthEndDate = new Date(selectedYear, selectedMonth, 0); // last day of month.
    const dayIsInSelectedMonth = date >= selectedMonthStartDate && date <= selectedMonthEndDate;
    const isToday = new Date().toDateString() === date.toDateString();
    let color = `grey`;
    let fontWeight = `normal`;
    if (isToday) {
      color = `blue`;
      fontWeight = `bold`;
    } else if (dayIsInSelectedMonth) {
      color = `black`;
    }
    const backgroundColor = this.state.selectedCellIDs.indexOf(cellID) !== -1 ? `yellow` : `white`;
    return (
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "flexStart",
          cursor: "pointer",
          userSelect: "none",
          backgroundColor 
        }} 
        className="calendar-day"
      >
        <div style={{ display: 'flex', flex: 1, margin: 5, color, fontWeight }}>
          {dayText}
        </div>
      </div>
    );
  }

  renderDayHeading = (dayIndex: number): Element<*> => (
    <div>{this.localizedWeekdayNames[dayIndex]}</div>
  );

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

  render() {
    return (
      <Calendar
        locale={this.locale}
        year={this.state.year}
        month={this.state.month}
        renderDay={(date, cellID) => this.renderDay(date, cellID, this.state.year, this.state.month)}
        renderDayHeading={this.renderDayHeading}
        renderHeading={this.renderHeading}
        borderOptions={{ width: 1, color: "black" }}
        onDayPress={this.onDayPress}
      />
    );
  }
}
