// @flow

import React, { useState } from 'react';
import type { Node } from 'react';

import { Pager } from './Pager';
import { Calendar } from '../lib/Calendar';
import { localizedWeekdayNames, localizedYearMonth } from '../lib/util/localizeDate';
import { nextYearMonth, previousYearMonth } from '../lib/util/date';
import { DefaultCalendarHeading } from '../lib/components/defaults/DefaultCalendarHeading';

const Day = ({ date }: { date: Date }) => (
  <div style={{ display: 'flex', flex: 1, justifyContent: `flexStart` }} className="calendar-day">
    <div style={{ display: 'flex', flex: 1, margin: 5 }}>{`${date.getMonth() + 1} ${date.getDate()}`}</div>
  </div>
);

const locale = 'en-us';
const weekdayNames = localizedWeekdayNames(locale, 'long');
const renderDayHeading = (dayIndex: number): Node => <div>{weekdayNames[dayIndex]}</div>;
const CalendarMonth = ({ year, month }: { year: number, month: number }) => (
  <Calendar
    locale={locale}
    year={year}
    month={month}
    renderDay={date => <Day date={date} />}
    renderDayHeading={renderDayHeading}
  />
);

const yearMonthToKey = (yearMonth: { year: number, month: number }): string =>
  `${yearMonth.year}${`-`}${yearMonth.month}`;

const monthSliderEntry = (yearMonth): { key: string, element: any } => ({
  key: yearMonthToKey(yearMonth),
  element: <CalendarMonth key={yearMonthToKey(yearMonth)} year={yearMonth.year} month={yearMonth.month} />,
});

export const Example7 = () => {
  const [currentYearMonth, setCurrentYearMonth] = useState<{ year: number, month: number }>({ year: 2019, month: 6 });
  const [monthsInSlider, setMonthsInSlider] = useState<Array<{ key: string, element: any }>>([
    monthSliderEntry(previousYearMonth(previousYearMonth(currentYearMonth))),
    monthSliderEntry(previousYearMonth(currentYearMonth)),
    monthSliderEntry(currentYearMonth),
    monthSliderEntry(nextYearMonth(currentYearMonth)),
    monthSliderEntry(nextYearMonth(nextYearMonth(currentYearMonth))),
  ]);

  const appendMonths = appendStartingAtYearMonth => {
    setMonthsInSlider(prevMonths => [
      ...prevMonths,
      monthSliderEntry(appendStartingAtYearMonth),
      monthSliderEntry(nextYearMonth(appendStartingAtYearMonth)),
    ]);
  };

  const prependMonths = prependStartingAtYearMonth => {
    setMonthsInSlider(prevMonths => [
      monthSliderEntry(previousYearMonth(prependStartingAtYearMonth)),
      monthSliderEntry(prependStartingAtYearMonth),
      ...prevMonths,
    ]);
  };

  return (
    <div style={{ display: `flex`, flexDirection: `column`, height: `100%`, width: `100%` }}>
      <DefaultCalendarHeading
        title={localizedYearMonth(locale, 'long', 'numeric', currentYearMonth.year, currentYearMonth.month)}
        onNextMonthClicked={() => {
          const newYearMonth = nextYearMonth(currentYearMonth);
          const afterNewYearMonth = nextYearMonth(newYearMonth);
          if (yearMonthToKey(afterNewYearMonth) === monthsInSlider[monthsInSlider.length - 1].key) {
            appendMonths(nextYearMonth(afterNewYearMonth));
          }
          setCurrentYearMonth(newYearMonth);
        }}
        onPreviousMonthClicked={() => {
          const newYearMonth = previousYearMonth(currentYearMonth);
          const previousToNewYearMonth = previousYearMonth(newYearMonth);
          if (yearMonthToKey(previousToNewYearMonth) === monthsInSlider[0].key) {
            prependMonths(previousYearMonth(previousToNewYearMonth));
          }
          setCurrentYearMonth(newYearMonth);
        }}
      />
      <Pager currentPageKey={yearMonthToKey(currentYearMonth)} pages={monthsInSlider} />
    </div>
  );
};
