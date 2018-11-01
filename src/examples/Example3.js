// @flow

import React, { Component } from 'react';
import type { Node } from 'react';

import { Calendar } from '../lib/Calendar';

type State = {
  year: number,
  month: number,
};

type Props = {};

/** This example shows a calendar rendered in English with paging implemented via the component's state. */
export class Example3 extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const date = new Date();
    this.state = { year: date.getFullYear(), month: date.getMonth() + 1 };
  }

  renderDay = (date: Date): Node => {
    return (
      <div style={{ display: 'flex', flex: 1, justifyContent: `flexStart` }} className="calendar-day">
        <div style={{ display: 'flex', flex: 1, margin: 5 }}>{date.getDate()}</div>
      </div>
    );
  };

  render() {
    return (
      <Calendar
        locale="en-us"
        year={this.state.year}
        month={this.state.month}
        renderDay={this.renderDay}
        borderOptions="no-border"
      />
    );
  }
}
