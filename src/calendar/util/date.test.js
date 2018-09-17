// @flow

import { calendarWeeksInMonth, localizedWeekdayNames, weekOrderedByGivenFirstWeekday } from "./date";

describe('calendarWeeksInMonth', () => {
  it('calculates the number of weeks correctly with Sunday start of week', () => {
    const result = [2015, 2016, 2017, 2018, 2019, 2020].map(year =>
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month =>
        `${year}-${month} days: ${calendarWeeksInMonth(year, month, 0)}`
      )
    )
    // Validated the snapshot results online against Google Calendar. Weeks/month match.
    expect(result).toMatchSnapshot();
  });

  it('calculates the number of weeks correctly with Monday start of week', () => {
    const result = [2015, 2016, 2017, 2018, 2019, 2020].map(year =>
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month =>
        `${year}-${month} days: ${calendarWeeksInMonth(year, month, 1)}`
      )
    )
    // Validated the snapshot results online against timeanddate.com. Weeks/month match.
    expect(result).toMatchSnapshot();
  });
});

describe('weekOrderedByGivenFirstWeekday', () => {
  it('orders correctly with Sunday first', () => {
    expect(weekOrderedByGivenFirstWeekday('en-us', 0)).toEqual([
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
    expect(weekOrderedByGivenFirstWeekday('en-us', 1)).toEqual([
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ]);
  });
  it ('orders correctly with Thursday first', () => {
    expect(weekOrderedByGivenFirstWeekday('en-us', 4)).toEqual([
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

describe('localizedWeekdayNames', () => {
  it('works for long weekday descriptions in English', () => {
      expect(localizedWeekdayNames('en-us')).toEqual([
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
