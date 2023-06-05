import { toCharArray, toUpperCase } from '../src/Utils.js';

describe('Utils', () => {
  // it('should return uppercase', () => {
  //   const actual = toUpperCase('abc');
  //   expect(actual).toBe('ABC');
  // });

  it.each([
    { input: 'abc', expected: 'ABC' },
    { input: 'cde', expected: 'CDE' },
    { input: 'def', expected: 'DEF' },
  ])('should return uppercase', ({ input, expected }) => {
    const actual = toUpperCase(input);
    expect(actual).toBe(expected);
  });

  it('should return char array', () => {
    const actual = toCharArray('abc');

    // expect(actual.length).toBe(3);
    expect(actual).toHaveLength(3); // array length check
    expect(actual).toEqual(['a', 'b', 'c']); // array equal check
    expect(actual).toContain('c'); // array contains check
    expect(actual).toEqual(expect.arrayContaining(['c', 'b'])); // array contains check
  });
});
