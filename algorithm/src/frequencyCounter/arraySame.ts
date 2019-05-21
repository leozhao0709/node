/**
 * give 2 arrays and write a function to return true if every value in the array has its corresponding value squared in the second array. The order doesn't need to match but the frequency should match.
 *
 * same([1, 2, 3], [4, 1, 9]) // true
 * same([1, 2, 3], [4, 9]) // false
 * same([1, 2, 1], [4, 4,, 1]) // false
 */

export const same = (arr1: number[], arr2: number[]) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  const frequency1 = {};
  const frequency2 = {};

  for (const val of arr1) {
    frequency1[val] = (frequency1[val] || 0) + 1;
  }

  for (const val of arr2) {
    frequency2[val] = (frequency2[val] || 0) + 1;
  }

  for (const key of Object.keys(frequency1)) {
    if (!((+key) ** 2 in frequency2)) {
      return false;
    }
    if (frequency2[(+key) ** 2] !== frequency1[key]) {
      return false;
    }
  }

  return true;
};
