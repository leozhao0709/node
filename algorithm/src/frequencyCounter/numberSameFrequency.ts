/**
 * Write a function called numberSameFrequency. Given two positive integers, find out if the two numbers have the same frequency of digits.
 */

export const numberSameFrequency = (num1: number, num2: number) => {
  const str1 = num1.toString();
  const str2 = num2.toString();

  const frequency1 = {};

  for (const char of str1) {
    frequency1[char] = (frequency1[char] || 0) + 1;
  }

  for (const char of str2) {
    if (!(char in frequency1) || frequency1[char] === 0) {
      return false;
    }
    frequency1[char]--;
  }

  return true;
};
