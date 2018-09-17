// @flow

import type { Weekday } from '../types';
type Week = [string, string, string, string, string, string, string];

// Adapted from: https://stackoverflow.com/a/33451102/932896
function arrayRotate(arr, count) {
  count -= arr.length * Math.floor(count / arr.length)
  return  [...arr.slice(count), ...arr.splice(0, count)];
}

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

export function localizedWeekdayNames(locale: string): Week {
  // January 4th, 1970, 00:00:00. The first Sunday after the epoch. We can use any arbitrary Sunday, here, but we do 
  // need concrete dates in order to get localized weekday names, using only native Javascript.
  const sunday = new Date(259200000);
  // We (mostly) trust ourselves, so we type-cast the result of this to 'Week'.
  return ((Array(7).fill().map((_, i) => {
    const date = new Date(sunday.valueOf());
    date.setDate(date.getDate() + i);
    return date.toLocaleDateString(locale, {weekday: 'long', timeZone: "utc"});
  }): any): Week);
}

/**
 * firstWeekDay - The first week day based on Javascript's native getDay() method where Sun = 0 ... Sat = 6. eg. If you
 *    want to indicate Mon, supply the value '1'.
 */
export function weekOrderedByGivenFirstWeekday(locale: string, firstWeekDay: Weekday): Week {
  // We know we'll get a list of 7 weekdays out of this, but flow does not support a type for a tuple with a 
  // generic amount of parameters, so we can't type arrayRotate as [genericNumberOfParams] => [genericNumberOfParams].
  // As such, we're helping flow out by telling it we know we have a 'Week' to return, here.
  return ((arrayRotate([...localizedWeekdayNames(locale)], firstWeekDay): any): Week);
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

export function longMonthName(locale: string, year: number, month: number) {
  const firstOfMonth = new Date(year, month-1, 1); // Convert from 1-indexed to 0-indexed.
  return firstOfMonth.toLocaleDateString(locale, { month: "long", year: "numeric" })
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
