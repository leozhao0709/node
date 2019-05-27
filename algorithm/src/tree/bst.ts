import { createSecureServer } from 'http2';

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
   * inOrderDfs
   */
  public inOrderDfs(root = this.root) {
    if (!root) {
      return [];
    }
    let data: number[] = [];
    if (root.left) {
      data = [...data, ...this.inOrderDfs(root.left)];
    }
    data.push(root.val);
    if (root.right) {
      data = [...data, ...this.inOrderDfs(root.right)];
    }

    return data;
  }

  /**
   * postOrderDfs
   */
  public postOrderDfs(root = this.root) {
    if (!root) {
      return [];
    }
    let data: number[] = [];
    if (root.left) {
      data = [...data, ...this.postOrderDfs(root.left)];
    }

    if (root.right) {
      data = [...data, ...this.postOrderDfs(root.right)];
    }

    data.push(root.val);
    return data;
  }

  /**
   * inOrderDfsIterative
   */
  public inOrderDfsIterative() {
    if (!this.root) {
      return [];
    }

    const stack: TreeNode[] = [];
    const data: number[] = [];
    stack.push(this.root);
    let curr: TreeNode | undefined = this.root;

    while (stack.length > 0) {
      // traverse left tree
      while (curr) {
        curr = curr.left;
        if (curr) {
          stack.push(curr);
        }
      }

      // traverse root
      curr = stack.pop()!;
      data.push(curr!.val);

      // traverse right tree
      if (curr.right) {
        stack.push(curr.right);
      }
      curr = curr.right;
    }

    return data;
  }

  /**
   * preOrderDfsIterative
   */
  public preOrderDfsIterative() {
    if (!this.root) {
      return [];
    }

    const stack: TreeNode[] = [];
    const data: number[] = [];
    let curr: TreeNode | undefined = this.root;
    stack.push(curr);

    while (stack.length > 0) {
      while (curr) {
        // traverse root
        data.push(curr.val);
        // traverse left
        curr = curr.left;
        if (curr) {
          stack.push(curr);
        }
      }

      curr = stack.pop()!;
      // traverse right
      if (curr.right) {
        stack.push(curr.right);
      }
      curr = curr.right;
    }

    return data;
  }

  /**
   * postOrderDfsIterative (two stack approach)
   */
  public postOrderDfsIterative() {
    if (!this.root) {
      return [];
    }

    const stack1: TreeNode[] = [];
    const stack2: TreeNode[] = [];
    stack1.push(this.root);

    while (stack1.length > 0) {
      const curr = stack1.pop()!;
      stack2.push(curr);

      if (curr.left) {
        stack1.push(curr.left);
      }
      if (curr.right) {
        stack1.push(curr.right);
      }
    }

    return stack2.reverse().map(node => node.val);
  }
}
