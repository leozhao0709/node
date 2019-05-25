import { quickSort } from '../../src/sort/quickSort';

describe('quick sort', () => {
  it('should give correct sort', () => {
    const testArr = [1, 90, 14, 23, 100, 67, 58];
    expect(quickSort([...testArr])).toEqual([...testArr].sort((a, b) => a - b));
  })
})