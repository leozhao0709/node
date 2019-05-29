import { reverseString } from '../../src/reversestring/reverse-string';

test('Reverse function exists', () => {
  expect(reverseString).toBeDefined();
});

test('Reverse reverses a string', () => {
  expect(reverseString('abcd')).toEqual('dcba');
});

test('Reverse reverses a string', () => {
  expect(reverseString('  abcd')).toEqual('dcba  ');
});
