// @flow

import React, { Component } from 'react';
import type { Node } from 'react';

import { Calendar } from '../lib/Calendar';

type Props = {};

const date = new Date();

export class Example3 extends Component<Props> {
  year = date.getFullYear();
  month = date.getMonth() + 1;

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
        year={this.year}
        month={this.month}
        renderDay={this.renderDay}
        borderOptions="no-border"
      />
    );
  }
}
