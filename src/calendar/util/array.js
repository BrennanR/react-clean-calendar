// @flow

// Adapted from: https://stackoverflow.com/a/33451102/932896
export function arrayRotate<T>(arr: Array<T>, count: number): Array<T> {
  count -= arr.length * Math.floor(count / arr.length);
  return [...arr.slice(count), ...arr.slice(0, count)];
}
