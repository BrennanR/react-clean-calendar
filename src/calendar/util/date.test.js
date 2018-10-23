// @flow

import { calendarWeeksInMonth, monthDayOffsetsByWeekForYearMonth } from './date';

describe('calendarWeeksInMonth', () => {
  it('calculates the number of weeks correctly with Sunday start of week', () => {
    const result = [2015, 2016, 2017, 2018, 2019, 2020].map(year =>
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
        month => `${year}-${month} days: ${calendarWeeksInMonth(year, month, 0)}`,
      ),
    );
    // Validated the snapshot results online against Google Calendar. Weeks/month match.
    expect(result).toMatchSnapshot();
  });

  it('calculates the number of weeks correctly with Monday start of week', () => {
    const result = [2015, 2016, 2017, 2018, 2019, 2020].map(year =>
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
        month => `${year}-${month} days: ${calendarWeeksInMonth(year, month, 1)}`,
      ),
    );
    // Validated the snapshot results online against timeanddate.com. Weeks/month match.
    expect(result).toMatchSnapshot();
  });
});

const SUNDAY = 0;
const MONDAY = 1;
describe('monthDayOffsetsByWeekForYearMonth', () => {
  it('calculates the correct day offsets for Oct 2018 with Sunday start', () => {
    const result = monthDayOffsetsByWeekForYearMonth(2018, 10, SUNDAY);
    expect(result).toMatchSnapshot();
  });
  it('calculates the correct day offsets for Nov 2014 with Sunday start', () => {
    const result = monthDayOffsetsByWeekForYearMonth(2014, 11, SUNDAY);
    expect(result).toMatchSnapshot();
  });

  it('calculates the correct day offsets for June 2018 with Monday start', () => {
    const result = monthDayOffsetsByWeekForYearMonth(2018, 6, MONDAY);
    expect(result).toMatchSnapshot();
  });
  it('calculates the correct day offsets for February 2015 with Monday start', () => {
    const result = monthDayOffsetsByWeekForYearMonth(2015, 2, MONDAY);
    expect(result).toMatchSnapshot();
  });
});
