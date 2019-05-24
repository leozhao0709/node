import { mergeSort } from '../../src/sort/mergeSort';

describe('merge sort', () => {
  it('should sort correct', () => {
    const testArr = [1, 90, 14, 23, 100, 67, 58];
    expect(mergeSort([...testArr])).toEqual([...testArr].sort((a, b) => a - b));
  });
});
