// @flow

// Adapted from: https://stackoverflow.com/a/33451102/932896
export function arrayRotate(arr: Array<any>, count: number) {
  count -= arr.length * Math.floor(count / arr.length)
  return  [...arr.slice(count), ...arr.splice(0, count)];
}
