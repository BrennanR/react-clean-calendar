// @flow

import { calendarWeeksInMonth } from "./date";

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
