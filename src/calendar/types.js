// @flow

// There's no good way to create a type from 'weekdays' in flow, so redefine the list.
// "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type BorderOptions = "no-border" | {
  color: string,
  width: number,
};
