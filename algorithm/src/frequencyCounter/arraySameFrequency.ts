/**
 * give 2 arrays and write a function to return true if every value in the array has its corresponding value squared in the second array. The order doesn't need to match but the frequency should match.
 *
 * arraySameFrequency([1, 2, 3], [4, 1, 9]) // true
 * arraySameFrequency([1, 2, 3], [4, 9]) // false
 * arraySameFrequency([1, 2, 1], [4, 4,, 1]) // false
 */

export const arraySameFrequency = (arr1: number[], arr2: number[]) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  const frequency2 = {};

  for (const val of arr2) {
    frequency2[val] = (frequency2[val] || 0) + 1;
  }

  for (const val of arr1) {
    if (!(val ** 2 in frequency2) || frequency2[val ** 2] === 0) {
      return false;
    }
    frequency2[val ** 2]--;
  }
  return true;
};
