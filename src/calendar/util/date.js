// @flow

import type { Weekday } from '../types';

// https://stackoverflow.com/a/11252167/932896
function treatAsUTC(date: Date): Date {
    const result = new Date(date);
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
    return result;
}

/** This function calculates the days between two dates, treating one day as 24 hours and each of the input dates
 * as if they refer to midnight. So startDate: 2018-09-03, endDate: 2018-09-04 would return 1.
 * https://stackoverflow.com/a/11252167/932896
 */
function daysBetween(startDate: Date, endDate: Date): number {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
}

export function daysInFirstCalendarWeek(firstDayOfTheMonth: Date, firstCalendarWeekday: Weekday): number {
  // const indexOfFirstCalendarWeekday = weekdays.indexOf(firstCalendarWeekday);
  const indexOfFirstWeekdayOfMonth = firstDayOfTheMonth.getDay(); // getDay is indexed Sun = 0, Sat = 6.
  if (firstCalendarWeekday === undefined || indexOfFirstWeekdayOfMonth === undefined) {
    throw new Error("Invalid state. We need both a first day of the month and first calendar weekday index.");
  }
  if (indexOfFirstWeekdayOfMonth >= firstCalendarWeekday) {
    return 7 - indexOfFirstWeekdayOfMonth + firstCalendarWeekday;
  }
  return firstCalendarWeekday - indexOfFirstWeekdayOfMonth;
}

// Sun = 0, Sat = 6.
export function firstWeekdayInMonth(year: number, month: number): number {
  return new Date(year, month-1, 1).getDay();
}

export function calendarWeeksInMonth(year: number, month: number, firstCalendarWeekday: Weekday): number {
  // The incoming month is 1 indexed. Convert it to 0 indexed.
  const firstDayOfMonth = new Date(year, month-1, 1);
  const lastDayOfPreviousMonth = new Date(year, month-1, 0);
  // 0 for day gives us the last day of the month. Using month directly gives us the next month due to 1-to-0 indexing.
  const lastDayOfMonth = new Date(year, month, 0);
  // This function uses midnight on the input dates to do its calculation. To get the total days in the month, we need
  // the difference between the last day of the previous month, and the last day of the current month.
  const totalDaysInMonth = daysBetween(lastDayOfPreviousMonth, lastDayOfMonth);
  const daysConsumedByFirstWeek = daysInFirstCalendarWeek(firstDayOfMonth, firstCalendarWeekday);
  const daysInMonthExcludingFirstWeek = totalDaysInMonth - daysConsumedByFirstWeek;
  // To get the remaining weeks in the month, take the days that weren't in the first week and divide by 7. Since
  // we need to include an additional calendar week for partial weeks, 'ceil' the division result. Add 1 to account
  // for the first week of the month.
  return Math.ceil(daysInMonthExcludingFirstWeek / 7) + 1;
}

export function nextMonth(year: number, month: number) {
  if (month === 12) {
    return {year: year + 1, month: 1};
  }
  return {year, month: month + 1};
}

export function previousMonth(year: number, month: number) {
  if (month === 1) {
    return {year: year - 1, month: 12};
  }
  return {year, month: month - 1};
}
