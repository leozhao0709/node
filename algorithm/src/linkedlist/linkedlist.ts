// --- Directions
// Implement classes Node and Linked Lists
// See 'directions' document

export class Node {
  constructor(public data: any, public next?: any) {
    if (!this.next) {
      this.next = null;
    }
  }
}

export class LinkedList {
  public head: Node | null = null;

  /**
   * insertFirst
   */
  public insertFirst(data: any) {
    this.head = new Node(data, this.head);
  }

  public size() {
    let p = this.head;
    let count = 0;
    while (p !== null) {
      p = p.next;
      count++;
    }
    return count;
  }

  public getFirst() {
    return this.head;
  }

  public getLast() {
    let p = this.head;
    while (p !== null) {
      if (p.next === null) {
        return p;
      }
      p = p.next;
    }

    return null;
  }

  public clear() {
    this.head = null;
  }

  public removeFirst() {
    if (!this.head) {
      return;
    }
    this.head = this.head.next;
  }

  public removeLast() {
    if (!this.head) {
      return;
    }

    let prev = this.head;
    let cur = this.head.next;

    if (cur === null) {
      this.head = null;
      return;
    }

    while (cur !== null) {
      if (cur.next === null) {
        prev.next = null;
        return;
      }
      cur = cur.next;
      prev = prev.next;
    }
  }

  public insertLast(data: any) {
    const node = new Node(data);
    if (!this.head) {
      this.head = node;
      return;
    }

    let curr = this.head;
    while (curr) {
      if (curr.next === null) {
        curr.next = node;
        return;
      }
      curr = curr.next;
    }
  }

  public getAt(n: number): Node | null {
    let curr = this.head;
    let count = 0;

    while (curr) {
      if (count === n) {
        return curr;
      }
      curr = curr.next;
      count++;
    }
    return null;
  }

  public removeAt(n: number) {
    if (!this.head) {
      return;
    }

    if (n === 0) {
      this.head = this.head.next;
      return;
    }

    const prev = this.getAt(n - 1);
    if (prev === null || prev.next === null) {
      return;
    }
    prev.next = prev.next.next;
  }

  public insertAt(data: any, n: number) {
    if (!this.head) {
      this.head = new Node(data);
      return;
    }

    if (n === 0) {
      this.head = new Node(data, this.head);
    }

    const prev = this.getAt(n - 1) || this.getLast();
    const node = new Node(data, prev!.next);
    prev!.next = node;
  }

  public forEach(fn: (node: Node) => void) {
    let curr = this.head;
    while (curr) {
      fn(curr);
      curr = curr.next;
    }
  }

  public *[Symbol.iterator]() {
    let curr = this.head;
    while (curr) {
      yield curr;
      curr = curr.next;
    }
  }
}
