/**
 * Based off: https://stackoverflow.com/a/21354858/932896
 * Modified to behave like python's range function.
 * Eg. range(0,4) = [0, 1, 2, 3]
 */
export function range(lowEnd, highEnd) {
  const arr = [];
  let c = highEnd - lowEnd;
  while (c--) {
    arr[c] = --highEnd;
  }
  return arr;
}
