/**
 * Write a function called findLongestSubstring, which accepts a string and returns the length of the longest substring with all distinct characters.
 *
 * expect(findLongestSubstring('')).toBe(0);
 * expect(findLongestSubstring('longestsubstring')).toBe(8);
 * expect(findLongestSubstring('thisishowwedoit')).toBe(6);
 * expect(findLongestSubstring('thisisawesome')).toBe(6);
 * expect(findLongestSubstring('thecatinthehat')).toBe(7);
 * expect(findLongestSubstring('bbbbbb')).toBe(1);
 * expect(findLongestSubstring('rithmschool')).toBe(7);
 *
 */

export const findLongestSubstring = (str: string) => {
  const seen = {};
  let i = 0;
  let start = 0;
  let longeset = 0;

  while (i < str.length) {
    const char = str[i];
    if (char in seen) {
      if (seen[char] >= start) {
        longeset = Math.max(longeset, i - start);
        start = seen[char] + 1;
      }
    }
    seen[char] = i;
    i++;
  }

  return Math.max(longeset, i - start);
};
