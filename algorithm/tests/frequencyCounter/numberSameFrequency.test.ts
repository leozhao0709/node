import { numberSameFrequency } from '../../src/frequencyCounter/numberSameFrequency';

describe('number same frequency', () => {
  it('should give correct value', () => {
    expect(numberSameFrequency(182, 281)).toBeTruthy();
    expect(numberSameFrequency(34, 14)).toBeFalsy();
    expect(numberSameFrequency(3589578, 5879385)).toBeTruthy();
    expect(numberSameFrequency(22, 222)).toBeFalsy();
  });
});
