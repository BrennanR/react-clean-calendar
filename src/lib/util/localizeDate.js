// @flow

import { arrayRotate } from './array.js';
import { range } from './range.js';
import type { Week, Weekday } from '../types';

export type YearFormat = 'numeric' | '2-digit';
export type MonthFormat = 'numeric' | '2-digit' | 'narrow' | 'short' | 'long';
export type WeekdayFormat = 'narrow' | 'short' | 'long';

export function localizedYearMonth(
  locale: string,
  monthFormat: MonthFormat,
  yearFormat: YearFormat,
  year: number,
  month: number,
) {
  const firstOfMonth = new Date(year, month - 1, 1); // Convert from 1-indexed to 0-indexed.
  return firstOfMonth.toLocaleDateString(locale, { month: monthFormat, year: yearFormat });
}

export function localizedWeekdayNames(locale: string, format: WeekdayFormat): Week {
  // January 4th, 1970, 00:00:00. The first Sunday after the epoch. We can use any arbitrary Sunday, here, but we do
  // need concrete dates in order to get localized weekday names, using only native Javascript.
  const sunday = new Date(259200000);
  // We (mostly) trust ourselves, so we type-cast the result of this to 'Week'.
  const weekdayNames = range(0, 7).map((_, i) => {
    const date = new Date(sunday.valueOf());
    date.setDate(date.getDate() + i);
    return date.toLocaleDateString(locale, { weekday: format, timeZone: 'utc' });
  });
  return ((weekdayNames: any): Week);
}

/**
 * firstWeekDay - The first week day based on Javascript's native getDay() method where Sun = 0 ... Sat = 6. eg. If you
 *    want to indicate Mon, supply the value '1'.
 */
export function localizedWeekdayNamesStartingWith(
  locale: string,
  format: WeekdayFormat,
  startingWeekDay: Weekday,
): Week {
  // We know we'll get a list of 7 weekdays out of this, but flow does not support a type for a tuple with a
  // generic amount of parameters, so we can't type arrayRotate as [genericNumberOfParams] => [genericNumberOfParams].
  // As such, we're helping flow out by telling it we know we have a 'Week' to return, here.
  return ((arrayRotate([...localizedWeekdayNames(locale, format)], startingWeekDay): any): Week);
}
