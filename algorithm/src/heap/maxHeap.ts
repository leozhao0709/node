/**
 * MaxHeap
 */
export class MaxHeap {
  public values: number[] = [];
  /**
   * insert
   */
  public insert(val: number) {
    this.values.push(val);
    this.shiftUp();
  }

  /**
   * extract
   *
   * 1. swap the last item with the first item to keep the tree as a full tree
   * 2. pop the last one which is the max val
   * 3. shift down the first val to correct position
   * 4. return the max val
   */
  public extract() {
    if (this.values.length === 0) {
      return undefined;
    }
    [this.values[0], this.values[this.values.length - 1]] = [this.values[this.values.length - 1], this.values[0]];
    const max = this.values.pop();
    this.shiftDown();
    return max;
  }

  private shiftUp() {
    let idx = this.values.length - 1;

    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      if (this.values[idx] > this.values[parentIdx]) {
        [this.values[idx], this.values[parentIdx]] = [this.values[parentIdx], this.values[idx]];
      }
      idx = parentIdx;
    }
  }

  private shiftDown() {
    if (this.values.length > 0) {
      let idx = 0;
      while (2 * idx + 1 < this.values.length) {
        let maxChildIndex = 2 * idx + 1;
        if (2 * idx + 2 < this.values.length && this.values[maxChildIndex] < this.values[2 * idx + 2]) {
          maxChildIndex = 2 * idx + 2;
        }

        if (this.values[idx] > this.values[maxChildIndex]) {
          return;
        }

        [this.values[idx], this.values[maxChildIndex]] = [this.values[maxChildIndex], this.values[idx]];
        idx = maxChildIndex;
      }
    }
  }
}
