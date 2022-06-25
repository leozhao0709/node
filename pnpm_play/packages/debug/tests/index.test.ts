import { debugSum } from '@app/index';

describe('debug index', () => {
  it('debugSum should work', () => {
    expect(debugSum(1, 2, 3)).toBe(6);
    expect(debugSum(1, 2, 3)).toEqual(6);
  });
});
