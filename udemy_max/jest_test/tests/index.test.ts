import { add } from '../src';

describe('test calculate', () => {
  test('add function should work', () => {
    expect(add(1, 2, 3)).toBe(6);
  });
});
