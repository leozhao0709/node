/**
 * BinarySearchTree
 */

class TreeNode {
  constructor(public val: number, public left?: TreeNode, public right?: TreeNode) {}
}

export class BinarySearchTree {
  public root?: TreeNode;

  /**
   * insert node to a tree
   * @param val
   */
  public insert(val: number) {
    const node = new TreeNode(val);

    if (!this.root) {
      this.root = node;
      return;
    }
    let curr: TreeNode = this.root;
    while (true) {
      if (curr.val === node.val) {
        return;
      }
      if (node.val < curr.val) {
        if (!curr.left) {
          curr.left = node;
          return;
        }
        curr = curr.left;
      } else {
        if (!curr.right) {
          curr.right = node;
          return;
        }
        curr = curr.right;
      }
    }
  }

  /**
   * BFS
   */
  public bfs() {
    if (!this.root) {
      return [];
    }

    const data: number[] = [];
    const queue: TreeNode[] = [];

    queue.push(this.root);
    while (queue.length > 0) {
      const curr = queue.shift()!;
      data.push(curr.val);
      if (curr.left) {
        queue.push(curr.left);
      }
      if (curr.right) {
        queue.push(curr.right);
      }
    }

    return data;
  }

  public preOrderDfs(root = this.root) {
    if (!root) {
      return [];
    }
    let data: number[] = [];
    data.push(root.val);
    if (root.left) {
      data = [...data, ...this.preOrderDfs(root.left)];
    }
    if (root.right) {
      data = [...data, ...this.preOrderDfs(root.right)];
    }

    return data;
  }

  /**
   * preOrderDfs
   */
  public preOrderDfsIterative() {
    if (!this.root) {
      return [];
    }

    const stack: TreeNode[] = [];
    const data: number[] = [];
    let curr: TreeNode = this.root;
    stack.push(curr);

    while (stack.length > 0) {
      curr = stack.pop()!;
      data.push(curr.val);

      if (curr.right) {
        stack.push(curr.right);
      }

      if (curr.left) {
        stack.push(curr.left);
      }
    }

    return data;
  }
}
