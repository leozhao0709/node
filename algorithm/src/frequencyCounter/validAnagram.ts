/**
 * Given two strings, write a function to determine if the second string is an anagram of the first. An anagram is a word, phrase, or name formed by rearranging the letters of another, such as cinema , formed from iceman.
 *
 * Examples:
 * expect(validAnagram('', '')).toBeTruthy();
 * expect(validAnagram('aaz', 'zza')).toBeFalsy();
 * expect(validAnagram('anagram', 'nagaram')).toBeTruthy();
 * expect(validAnagram('rat', 'car')).toBeFalsy();
 * expect(validAnagram('awesome', 'awesom')).toBeFalsy();
 * expect(validAnagram('amanaplanacanalpanama', 'acanalmanplanpamana')).toBeFalsy();
 * expect(validAnagram('qwerty', 'qeywrt')).toBeTruthy();
 * expect(validAnagram('texttwisttime', 'timetwisttext')).toBeTruthy();
 */

export const validAnagram = (str1: string, str2: string) => {
  if (str1.length !== str2.length) {
    return false;
  }

  const frequcy1 = {};

  for (const char of str1) {
    frequcy1[char] = (frequcy1[char] || 0) + 1;
  }

  for (const char of str2) {
    if (!(char in frequcy1) || frequcy1[char] === 0) {
      return false;
    }
    frequcy1[char]--;
  }
  return true;
};
