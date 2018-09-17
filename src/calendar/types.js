// @flow

// These are the weekday integers, as defined in Javascript. 0 = Sunday, 6 = Saturday.
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type WeekdayFormat = "narrow" | "short" | "long";
export type Week = [string, string, string, string, string, string, string];

export type BorderOptions = "no-border" | {
  color: string,
  width: number,
};
