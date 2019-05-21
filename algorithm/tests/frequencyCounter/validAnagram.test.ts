import { validAnagram } from '../../src/frequencyCounter/validAnagram';

describe('validAnagram should give correct result', () => {
  it('should return correct value for different test', () => {
    expect(validAnagram('', '')).toBeTruthy();
    expect(validAnagram('aaz', 'zza')).toBeFalsy();
    expect(validAnagram('anagram', 'nagaram')).toBeTruthy();
    expect(validAnagram('rat', 'car')).toBeFalsy();
    expect(validAnagram('awesome', 'awesom')).toBeFalsy();
    expect(validAnagram('amanaplanacanalpanama', 'acanalmanplanpamana')).toBeFalsy();
    expect(validAnagram('qwerty', 'qeywrt')).toBeTruthy();
    expect(validAnagram('texttwisttime', 'timetwisttext')).toBeTruthy();
  });
});
