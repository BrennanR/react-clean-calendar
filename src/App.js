// @flow

import React, { Component } from 'react';

import { Calendar } from './calendar/Calendar';
import './App.css';

type State = {
  year: number,
  month: number,
};

type Props = {};

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const date = new Date();
    this.state = { year: date.getFullYear(), month: date.getMonth() + 1};
  }

  renderDay = (date: Date) => {
    const dayNumber = date.getDate();
    const dayText = dayNumber === 1 ? `${date.toLocaleDateString("en-us", {month: 'short'})} ${dayNumber}` : dayNumber;
    return (
      <div style={{ display: 'flex', flex: 1, justifyContent: `flexStart` }} className="calendar-day">
        <div style={{ display: 'flex', flex: 1, margin: 5 }}>
          {dayText}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div style={{ display: "flex", width: "100%", height: "100%", }} className="App">
        <Calendar
          year={this.state.year}
          month={this.state.month}
          renderDay={this.renderDay}
          onNextMonthClicked={(year, month) => this.setState({ year, month })}
          onPreviousMonthClicked={(year, month) => this.setState({ year, month })}
        />
      </div>
    );
  }
}

export default App;
