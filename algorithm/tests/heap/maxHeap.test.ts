import { MaxHeap } from '../../src/heap/maxHeap';
describe('max heap', () => {
  const maxHeap = new MaxHeap();
  beforeAll(() => {
    maxHeap.insert(41);
    maxHeap.insert(39);
    maxHeap.insert(33);
    maxHeap.insert(18);
    maxHeap.insert(27);
    maxHeap.insert(12);
    maxHeap.insert(55);
  });

  it('should insert correct', () => {
    expect(maxHeap.values).toEqual([55, 39, 41, 18, 27, 12, 33]);
  });

  it('should extract correct', () => {
    expect(maxHeap.extract()).toBe(55);
    expect(maxHeap.extract()).toBe(41);
    expect(maxHeap.extract()).toBe(39);
    expect(maxHeap.extract()).toBe(33);
    expect(maxHeap.extract()).toBe(27);
    expect(maxHeap.extract()).toBe(18);
    expect(maxHeap.extract()).toBe(12);
    expect(maxHeap.extract()).toBeUndefined();
  });
});
