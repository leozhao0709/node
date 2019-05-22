import { sumZero } from '../../src/multipointer/sumZero';

describe('sumZero should return correct value', () => {
  it('should give correct value', () => {
    expect(sumZero([-3, -2, -1, 0, 1, 2, 3])).toEqual([-3, 3]);
    expect(sumZero([-2, 0, 1, 3])).toBeUndefined();
    expect(sumZero([1, 2, 3])).toBeUndefined();
  });
});
