/**
 * Write a function called sumZero which accepts a sorted array of integers. The function hsould find the first pair when the sum is 0. Return an array that includes both values that sum to zero or undefined if a pair does not exist
 *
 * expect(sumZero([-3, -2, -1, 0, 1, 2, 3])).toEqual([-3, 3]);
 * expect(sumZero([-2, 0, 1, 3])).toBeUndefined();
 * expect(sumZero([1, 2, 3])).toBeUndefined();
 *
 */

export const sumZero = (arr: number[]) => {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    if (arr[left] + arr[right] === 0) {
      return [arr[left], arr[right]];
    }
    if (arr[left] + arr[right] > 0) {
      right--;
    } else {
      left++;
    }
  }
};
