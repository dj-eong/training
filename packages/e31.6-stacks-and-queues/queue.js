/** Node: node for a queue. */

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

/** Queue: chained-together nodes where you can
 *  remove from the front or add to the back. */

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    /** enqueue(val): add new value to end of the queue. Returns undefined. */

    enqueue(val) {
        const node = new Node(val);
        if (!this.first) {
            this.first = node;
            this.last = node;
        } else {
            this.last.next = node;
            this.last = this.last.next;
        }
        this.size++;
        return undefined;
    }

    /** dequeue(): remove the node from the start of the queue
     * and return its value. Should throw an error if the queue is empty. */

    dequeue() {
        if (!this.first) {
            throw new Error('Queue is empty, cannot dequeue!');
        }
        try {
            const node = this.first;
            this.first = this.first.next;
            this.size--;
            return node.val;
        } catch (error) {
            console.error(error);
        }
    }

    /** peek(): return the value of the first node in the queue. */

    peek() {
        return this.first.val;
    }

    /** isEmpty(): return true if the queue is empty, otherwise false */

    isEmpty() {
        return this.first == null;
    }
}

module.exports = Queue;
