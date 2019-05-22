import { arraySameFrequency } from '../../src/frequencyCounter/arraySameFrequency';

describe('arraySame should return correct value', () => {
  it('should give true when correct value in different array', () => {
    expect(arraySameFrequency([1, 2, 3], [4, 1, 9])).toBeTruthy();
  });

  it('should give true when frequcy is same and value is correct', () => {
    expect(arraySameFrequency([1, 2, 1], [4, 1, 1])).toBeTruthy();
  });

  it('should give false when 2 array has different length', () => {
    expect(arraySameFrequency([1, 2, 3], [4, 9])).toBeFalsy();
  });

  it('should give false when the frequency is different', () => {
    expect(arraySameFrequency([1, 2, 1], [4, 4, 1])).toBeFalsy();
  });

  it('should give false when a value in 2nd array but no correspond value in 1st array', () => {
    expect(arraySameFrequency([1, 2, 1], [4, 9, 1])).toBeFalsy();
  });

  it('should give false when a value in 1nd array but no correspond in 2st array', () => {
    expect(arraySameFrequency([1, 3, 2], [1, 4, 16])).toBeFalsy();
  });
});
