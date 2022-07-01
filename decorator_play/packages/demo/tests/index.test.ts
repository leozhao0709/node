import { sum } from '@app/index';

describe('index', () => {
  it('sum should work', () => {
    expect(sum(1, 2, 3)).toBe(6);
    expect(sum(1, 2, 3)).toEqual(6);
  });
});
