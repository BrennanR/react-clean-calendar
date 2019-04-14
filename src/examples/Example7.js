// @flow

import React, { useEffect, useRef, useState } from 'react';
import type { Node } from 'react';
import { useMeasure } from '@softbind/react-hooks';

import { Calendar } from '../lib/Calendar';
import { localizedWeekdayNames, localizedYearMonth } from '../lib/util/localizeDate';
import { nextMonth as getNextMonth, previousMonth as getPreviousMonth } from '../lib/util/date';
import { DefaultCalendarHeading } from '../lib/components/defaults/DefaultCalendarHeading';

const Day = ({ date }: { date: Date }) => (
  <div style={{ display: 'flex', flex: 1, justifyContent: `flexStart` }} className="calendar-day">
    <div style={{ display: 'flex', flex: 1, margin: 5 }}>{`${date.getMonth() + 1} ${date.getDate()}`}</div>
  </div>
);

const locale = 'en-us';
const weekdayNames = localizedWeekdayNames(locale, 'long');
const renderDayHeading = (dayIndex: number): Node => <div>{weekdayNames[dayIndex]}</div>;
const CalendarMonth = ({ locale, year, month }: { locale: string, year: number, month: number }) => (
  <Calendar
    locale={locale}
    year={year}
    month={month}
    renderDay={date => <Day date={date} />}
    renderDayHeading={renderDayHeading}
  />
);

export const Example7 = () => {
  const [currentYearMonth, setCurrentYearMonth] = useState<{ year: number, month: number }>({ year: 2019, month: 6 });
  const [monthsInSlider, setMonthsInSlider] = useState<Array<[string, any]>>([]);
  const calendarContainerRef = useRef(null);
  const { bounds } = useMeasure(calendarContainerRef, 'bounds');

  const { height = 0, width = 0 } = bounds || {};

  return (
    <div style={{ display: `flex`, flexDirection: `column`, height: `100%`, width: `100%` }}>
      <DefaultCalendarHeading
        title={localizedYearMonth(locale, 'long', 'numeric', currentYearMonth.year, currentYearMonth.month)}
        onNextMonthClicked={() => {
          const { year, month } = getNextMonth(currentYearMonth.year, currentYearMonth.month);
          setCurrentYearMonth({ year, month });
        }}
        onPreviousMonthClicked={() => {
          const { year, month } = getPreviousMonth(currentYearMonth.year, currentYearMonth.month);
          setCurrentYearMonth({ year, month });
        }}
      />
      <div style={{ flex: 1, width: `100%` }} ref={calendarContainerRef}>
        <div style={{ width, height }}>
          {bounds &&
            monthsInSlider &&
            monthsInSlider.map(([key, month]) => {
              return (
                // The slider library overwrites the outer-div for each slide, so style the inner one.
                <div key={key}>
                  <div style={{ display: `flex`, flexDirection: `row`, height, width }}>{month}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
