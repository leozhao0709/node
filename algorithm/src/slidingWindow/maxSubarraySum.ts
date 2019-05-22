/**
 * Write a function called maxSubarraySum which accepts an array of integers and a number called n. The function should calculate the maximum sum of n consecutive elements in the array
 */

export const maxSubarraySum = (arr: number[], n: number) => {
  if (arr.length < n) {
    return null;
  }

  let maxSum = 0;

  for (let i = 0; i < n; i++) {
    maxSum += arr[i];
  }

  let tempSum = maxSum;
  for (let i = n; i < arr.length; i++) {
    tempSum = tempSum - arr[i - n] + arr[i];
    maxSum = Math.max(maxSum, tempSum);
  }

  return maxSum;
};
