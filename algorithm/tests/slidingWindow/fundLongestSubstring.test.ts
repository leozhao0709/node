import { findLongestSubstring } from '../../src/slidingWindow/findLongestSubstring';

describe('findLongestSubstring', () => {
  it('should give correct result', () => {
    expect(findLongestSubstring('')).toBe(0);
    expect(findLongestSubstring('longestsubstring')).toBe(8);
    expect(findLongestSubstring('thisishowwedoit')).toBe(6);
    expect(findLongestSubstring('thisisawesome')).toBe(6);
    expect(findLongestSubstring('thecatinthehat')).toBe(7);
    expect(findLongestSubstring('bbbbbb')).toBe(1);
    expect(findLongestSubstring('rithmschool')).toBe(7);
  });
});
