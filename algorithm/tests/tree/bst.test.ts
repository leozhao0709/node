import { BinarySearchTree } from '../../src/tree/bst';

describe('binary search tree insert and traversal', () => {
  let bst: BinarySearchTree;

  beforeAll(() => {
    /**
     *       10
     *    6       15
     * 3   8        20
     */
    bst = new BinarySearchTree();
    bst.insert(10);
    bst.insert(6);
    bst.insert(3);
    bst.insert(15);
    bst.insert(20);
    bst.insert(8);
    bst.insert(8);
  });

  it('should insert correctly', () => {
    expect(bst.root).not.toBeUndefined();
    expect(bst.root!.val).toBe(10);
    expect(bst.root!.left!.val).toBe(6);
    expect(bst.root!.left!.left!.val).toBe(3);
    expect(bst.root!.left!.right!.val).toBe(8);
    expect(bst.root!.right!.val).toBe(15);
    expect(bst.root!.right!.right!.val).toBe(20);
  });

  it('should give correct value during bfs', () => {
    expect(new BinarySearchTree().bfs()).toEqual([]);
    expect(bst.bfs()).toEqual([10, 6, 15, 3, 8, 20]);
  });

  it('should give correct value during pre order recursively dfs', () => {
    expect(new BinarySearchTree().preOrderDfs()).toEqual([]);
    expect(bst.preOrderDfs()).toEqual([10, 6, 3, 8, 15, 20]);
  });

  it('should give correct value during pre order dfs', () => {
    expect(new BinarySearchTree().preOrderDfsIterative()).toEqual([]);
    expect(bst.preOrderDfsIterative()).toEqual([10, 6, 3, 8, 15, 20]);
  });
});
