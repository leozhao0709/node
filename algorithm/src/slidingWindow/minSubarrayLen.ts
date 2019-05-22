/**
 * Write a function called minSubArrayLen  which accepts two parameters - an array of positive integers and a positive integer.
 *
 * This function should return the minimal length of a contiguous subarray of which the sum is greater than or equal to the integer passed to the function. If there isn't one, return 0 instead.
 *
 * Examples:
 * expect(minSubArrayLen([2, 3, 1, 2, 4, 3], 7)).toBe(2);
 * expect(minSubArrayLen([2, 1, 6, 5, 4], 9)).toBe(2);
 * expect(minSubArrayLen([3, 1, 7, 11, 2, 9, 8, 21, 62, 33, 19], 52)).toBe(1);
 * expect(minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 39)).toBe(3);
 * expect(minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 55)).toBe(5);
 * expect(minSubArrayLen([4, 3, 3, 8, 1, 2, 3,], 11)).toBe(2);
 * expect(minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 95)).toBe(0);
 */

export const minSubArrayLen = (arr: number[], num: number) => {
  if (arr.length === 0) {
    return 0;
  }

  let right = 0;
  let left = 0;
  let sum = 0;
  let res = Infinity;

  while (right < arr.length) {
    if (sum < num) {
      sum += arr[right];
      right++;
    } else {
      res = Math.min(res, right - left);
      sum -= arr[left];
      left++;
    }
  }

  while (left < arr.length && sum >= num) {
    res = Math.min(res, right - left);
    sum -= arr[left];
    left++;
  }

  return res === Infinity ? 0 : res;
};
