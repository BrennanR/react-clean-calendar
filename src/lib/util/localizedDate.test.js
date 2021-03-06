// @flow

import { localizedWeekdayNames, localizedWeekdayNamesStartingWith, localizedYearMonth } from './localizeDate';

describe('localizedYearMonth', () => {
  it('works for years and months in English', () => {
    expect(localizedYearMonth('en-us', 'short', 'numeric', 2019, 1)).toEqual('Jan 2019');
  });
});

describe('localizedWeekdayNames', () => {
  it('works for long weekday descriptions in English', () => {
    expect(localizedWeekdayNames('en-us', 'long')).toEqual([
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]);
  });
});

describe('localizedWeekdayNamesStartingWith', () => {
  it('orders correctly with Sunday first', () => {
    expect(localizedWeekdayNamesStartingWith('en-us', 'long', 0)).toEqual([
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]);
  });
  it('orders correctly with Monday first', () => {
    expect(localizedWeekdayNamesStartingWith('en-us', 'long', 1)).toEqual([
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ]);
  });
  it('orders correctly with Thursday first', () => {
    expect(localizedWeekdayNamesStartingWith('en-us', 'long', 4)).toEqual([
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
    ]);
  });
});
