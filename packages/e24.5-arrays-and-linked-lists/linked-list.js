/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
   let newNode = new Node(val);
   if (this.head == null) this.head = newNode;
   if (this.tail != null) this.tail.next = newNode;
   this.tail = newNode;
   this.length++;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val);
    if (this.tail == null) this.tail = newNode;
    if (this.head != null) newNode.next = this.head;
    this.head = newNode;
    this.length++;
  }

  /** pop(): return & remove last item. */

  pop() {
    if (this.tail != null) {
      let value = this.tail.val;
      if (this.tail === this.head) this.head = null;
      let current = this.head;

      while (current != null && current.next !== this.tail) {
          current = current.next;
      }
      this.tail = current;
      this.length--;
      return value;
    }
  }

  /** shift(): return & remove first item. */

  shift() {
    if (this.head != null) {
        let value = this.head.val;
        if (this.head === this.tail) this.tail = null;
        this.head = this.head.next;
        this.length--;
        return value;
    }
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    let count = 0;
    let current = this.head;
    while (current != null) {
        if (count == idx) return current.val;
        current = current.next;
        count++;
    }
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    let count = 0;
    let current = this.head;
    while (current != null) {
        if (count == idx) {
            current.val = val;
        }
        current = current.next;
        count++;
    }
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    let count = 0;
    let newNode = new Node(val);
    let current = this.head;
    while (current != null) {
        if (count + 1 == idx) {
            newNode.next = current.next;
            current.next = newNode;
        }
        if (newNode.next == null) this.tail = newNode;
        current = current.next;
        count++;
    }
    if (idx == 0) {
        if (this.head == null) this.tail = newNode;
        this.head = newNode;
    }
    this.length++;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    let count = 0;
    let current = this.head;
    while (current != null) {
        if (count + 1 == idx) {
            let value = current.next.val;
            current.next = current.next.next;
            return value;
        }
        current = current.next;
        count++;
    }
    if (idx == 0) {
        this.head = this.head.next;
        if (this.head == null) this.tail = null;
    }
    this.length--;
  }

  /** average(): return an average of all values in the list */

  average() {
    let count = 0;
    let sum = 0;
    let current = this.head;
    while (current != null) {
        sum += current.val;
        current = current.next;
        count++;
    }
    if (count == 0) return 0;
    return sum / count;    
  }
}

module.exports = LinkedList;
