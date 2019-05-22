import { maxSubarraySum } from '../../src/slidingWindow/maxSubarraySum';

describe('maxSubarray sum test', () => {
  it('should give correct value in maxSubarray sum', () => {
    expect(maxSubarraySum([1, 2, 5, 3, 8, 1, 5], 2)).toBe(11);
    expect(maxSubarraySum([1, 2, 5, 3, 8, 1, 5], 4)).toBe(18);
    expect(maxSubarraySum([4, 2, 1, 6], 1)).toBe(6);
    expect(maxSubarraySum([4, 2, 1, 6, 2], 4)).toBe(13);
    expect(maxSubarraySum([], 4)).toBeNull();
  });
});
