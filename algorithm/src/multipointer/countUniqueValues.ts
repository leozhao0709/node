/**
 * Implement a function called countUniqueValues,which accepts a sorted array, and counts the unique values in the array. There can be negative numbers in the array, but it will always be sorted.
 *
 * expect(countUniqueValues([1, 1, 1, 1, 1, 2])).toBe(2);
 * expect(countUniqueValues([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13])).toBe(7);
 * expect(countUniqueValues([])).toBe(0);
 * expect(countUniqueValues([-2, -1, -1, 0, 1])).toBe(4);
 */

export const countUniqueValues = (arr: number[]) => {
  if (arr.length === 0) {
    return 0;
  }

  let count = 1;

  let p1 = 0;
  let p2 = 1;

  while (p2 < arr.length) {
    if (arr[p2] !== arr[p1]) {
      count++;
    }
    p1++;
    p2++;
  }

  return count;
};
