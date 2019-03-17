// @flow

import React from 'react';

type DefaultCalendarHeadingProps = {
  title: string,
  onNextMonthClicked: () => void,
  onPreviousMonthClicked: () => void,
};

export const DefaultCalendarHeading = (props: DefaultCalendarHeadingProps) => {
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: 5, marginBottom: 5 }}>
      <button onClick={props.onPreviousMonthClicked}>{'<<<'}</button>
      <div style={{ fontSize: 20 }}>{props.title}</div>
      <button onClick={props.onNextMonthClicked}>{'>>>'}</button>
    </div>
  );
};
