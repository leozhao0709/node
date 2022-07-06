import { add, minus, multi } from '@app/math';

describe('math.ts', () => {
  it('test 3+7', () => {
    expect(add(3, 7)).toBe(10);
  });

  it('test 3 - 3', () => {
    expect(minus(3, 3)).toBe(0);
  });

  it('test 3 * 3', () => {
    expect(multi(3, 3)).toBe(9);
  });
});
