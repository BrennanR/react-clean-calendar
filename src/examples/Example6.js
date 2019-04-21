// @flow

import React, { useState } from 'react';
import type { Node } from 'react';

import { Calendar } from '../lib/Calendar';
import { DefaultCalendarHeading } from '../lib/components/defaults/DefaultCalendarHeading';
import { nextMonth, previousMonth } from '../lib/util/date';
import { localizedWeekdayNames, localizedYearMonth } from '../lib/util/localizeDate';

type Event = {
  date: string,
  description: string,
};

const Example6 = () => {
  const locale = 'en-us';
  const weekdayNames = localizedWeekdayNames(locale, 'long');

  const [yearMonth, setYearMonth] = useState<{ year: number, month: number }>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });
  const [selectedCellIDs, setSelectedCellIDs] = useState<Array<string>>([]);
  const [events] = useState<Array<Event>>([
    { date: '2019-04-15', description: 'Pay Day' },
    { date: '2019-04-15', description: "Doctor's Appointment" },
    { date: '2019-04-28', description: "Carl's Birthday" },
  ]);

  const onDayPress = (date: Date, cellID: string) => {
    if (selectedCellIDs.indexOf(cellID) !== -1) {
      setSelectedCellIDs(selectedCellIDs.filter(cID => cID !== cellID));
    } else {
      setSelectedCellIDs([...selectedCellIDs, cellID]);
    }
  };

  const eventsOnDate = (date: Date) => {
    return events.filter(event => event.date === date.toISOString().substring(0, 10));
  };

  const renderDay = (date: Date, cellID: string, selectedYear: number, selectedMonth: number) => {
    const dayNumber = date.getDate();
    const dayText = dayNumber === 1 ? `${date.toLocaleDateString(locale, { month: 'short' })} ${dayNumber}` : dayNumber;
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
    const events = eventsOnDate(date);
    const backgroundColor = selectedCellIDs.indexOf(cellID) !== -1 ? `yellow` : `white`;
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
                width: `95%`,
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

  const renderDayHeading = (dayIndex: number): Node => <div>{weekdayNames[dayIndex]}</div>;

  const renderHeading = () => {
    return (
      <DefaultCalendarHeading
        title={localizedYearMonth(locale, 'long', 'numeric', yearMonth.year, yearMonth.month)}
        onNextMonthClicked={() => {
          const { year, month } = nextMonth(yearMonth.year, yearMonth.month);
          setYearMonth({ year, month });
        }}
        onPreviousMonthClicked={() => {
          const { year, month } = previousMonth(yearMonth.year, yearMonth.month);
          setYearMonth({ year, month });
        }}
      />
    );
  };

  return (
    <Calendar
      locale={locale}
      year={yearMonth.year}
      month={yearMonth.month}
      renderDay={(date, cellID) => renderDay(date, cellID, yearMonth.year, yearMonth.month)}
      renderHeading={renderHeading}
      renderDayHeading={renderDayHeading}
      borderOptions={{ width: 1, color: 'black' }}
      onDayPress={onDayPress}
    />
  );
};

export { Example6 };
