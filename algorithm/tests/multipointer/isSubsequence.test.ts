import { isSubsequence } from '../../src/multipointer/isSubsequence';

describe('isSubsequence', () => {
  it('should give correct value', () => {
    expect(isSubsequence('hello', 'hello world')).toBeTruthy();
    expect(isSubsequence('sing', 'sting')).toBeTruthy();
    expect(isSubsequence('abc', 'abracadabra')).toBeTruthy();
    expect(isSubsequence('abc', 'acb')).toBeFalsy();
  });
});
