import { add, asyncAdd } from '../src/calculate';

describe('test calculate', () => {
  test('add function should work', () => {
    expect(add(1, 2, 3)).toBe(6);
  });

  test('async add function should work', async () => {
    const result = await asyncAdd(2, 1, 2, 3); // this function means delay 2 second and then add (1, 2, 3)
    expect(result).toBe(6);
  });
});
