'use strict';
/* eslint-enable */

const myLinkedList = () => {
  let size = 0; //     --> current number of elements contained
  let head = null; //  --> the pointer to the head of the linkedlist
  let tail = null; //  --> the pointer to the tail of the linkedlist

  // adds a new node to the end of the list
  const append = (v) => {
    // v for vendetta, I mean, for value.
    size++;
    if (size === 1) {
      // first element in the linkedList
      const newNode = node(v, null, null);
      head = newNode;
      tail = newNode;
    } else {
      // last element in the Linkedlist
      const prevNode = tail;
      const newNode = node(v, null, prevNode);
      prevNode.nextNode = newNode;
      tail = newNode;
    }
  };

  // adds a new node to the start of the list
  const prepend = (v) => {
    const newNode = node(v, head, null); // the node we're wona prepend

    if (head !== null) {
      const prevHead = head; // the head that now will bhe the second element.
      prevHead.prevNode = newNode;
    }

    head = newNode; // now the linkedlist head is the new node.
    size++;
    if (size === 1) {
      // first element in the linkedlist
      tail = newNode;
    }
  };

  // returns the size of the linkedlist.
  const getSize = () => {
    if (size === null || size === undefined) {
      return 0;
    }

    return size;
  };

  // NO DIRTY JOKES
  const getHead = () => {
    return head;
  };

  // NO DIRTY JOKES
  const getTail = () => {
    return tail;
  };

  // returns the node at the given index
  const at = (index) => {
    if (index > size) return null; // we don't have that many nodes
    if (index === 1) return head;
    if (index === size) return tail;

    let node = {};
    const middle = parseInt(size / 2);

    if (index <= middle) {
      node = head;
      // the search begins from the head
      for (let i = 2; i <= index; i++) {
        node = node.nextNode;
      }
    } else {
      // the search begins from the tail
      node = tail;
      for (let i = size - 1; i >= index; i--) {
        node = node.prevNode;
      }
    }
    return node;
  };

  // removes the last element from the list
  const pop = () => {
    if (tail !== null && tail !== undefined) {
      const prevLastNode = tail.prevNode;
      prevLastNode.nextNode = null;
      tail = prevLastNode;
      size--;
    }
  };

  // returns true if the value is in some node of the linkedlist, else returns false
  const contains = (v) => {
    let node = head;

    while (node !== null && node !== undefined) {
      if (node.value === v) {
        return true;
      }
      node = node.nextNode;
    }

    return false;
  };

  // returns the index of the node containing such value, else returns null
  const find = (v) => {
    let node = head;

    while (node !== null && node !== undefined) {
      if (node.value === v) {
        return node.getIndex();
      }
      node = node.nextNode;
    }

    return null;
  };

  // represent the LinkedList as an string like (value) -> (value) -> (value) -> null
  const toString = () => {
    if (size === 0) return 'null';

    let node = head;
    let cadena = ''; // cadena is String in spanish, can also be chain, you're welcome for the free info

    while (node !== null && node !== undefined) {
      cadena += '(' + String(node.value) + ')->';
      node = node.nextNode;
    }
    cadena += 'null';

    return cadena;
  };

  // shows each node value with their previous and next values.
  const stringAllNodes = () => {
    let currentNode = head;
    let cadena = '';

    while (currentNode !== null && currentNode !== undefined) {
      cadena += currentNode.toString() + '\n';
      currentNode = currentNode.nextNode;
    }
    return cadena;
  };

  // substitutes a node with the value in the index provided
  const substituteAt = (v, index) => {
    // v for value, ind for index
    const actualNode = at(index);
    const prevNode = actualNode.prevNode;
    const nextNode = actualNode.nextNode;
    const newNode = node(v, nextNode, prevNode);
    nextNode.prevNode = newNode;
    prevNode.nextNode = newNode;
    if (index === 1) {
      head = newNode;
    }
    if (index === size) {
      tail = newNode;
    }
  };

  // inserts a new node with the value in the index provided
  const insertAt = (v, index) => {
    // v for value, ind for index
    const actualNode = at(index);
    const prevNode = actualNode.prevNode;
    const newNode = node(v, actualNode, prevNode);
    actualNode.prevNode = newNode;
    prevNode.nextNode = newNode;
    size++;
    if (index === 1) {
      head = newNode;
    }
    if (index === size) {
      tail = newNode;
    }
  };

  // removes the node at the index provided
  const removeAt = (index) => {
    // v for value, ind for index
    const actualNode = at(index);
    const prevNode = actualNode.prevNode;
    const nextNode = actualNode.nextNode;
    nextNode.prevNode = prevNode;
    prevNode.nextNode = nextNode;
    size--;
    if (index === 1) {
      head = nextNode;
    }
    if (index === size) {
      tail = prevNode;
    }
  };

  // we empty the all linkedlist
  const empty = () => {
    head = null;
    tail = null;
    size = 0;
  };

  return {
    size,
    head,
    tail,
    append,
    prepend,
    getSize,
    getHead,
    getTail,
    at,
    pop,
    contains,
    find,
    toString,
    stringAllNodes,
    substituteAt,
    insertAt,
    removeAt,
    empty,
  };
};

// my node object
const node = (value, nextNode, prevNode) => {
  // Calculates the index of the node by looping back until a null previous value is found. It wouldn't work in circled linkedLists
  function getIndex() {
    let localNode = this;
    let index = 1;

    while (localNode.prevNode !== null && localNode.prevNode !== undefined) {
      index++;
      localNode = localNode.prevNode;
    }

    return index;
  }

  function toString() {
    const valueNode = this.value != null ? this.value : 'null';
    const valueNext = this.nextNode != null ? this.nextNode.value : 'null';
    const valuePrev = this.prevNode != null ? this.prevNode.value : 'null';

    return `(${valueNode}) | nextNode (${valueNext}) | prevNode (${valuePrev})`;
  }

  return { value, nextNode, prevNode, getIndex, toString };
};

const list = myLinkedList('test');

// I still don't know how to use jest to test this functions, so I did it manually:
console.log('\nTesting append');
testAppend();

console.log('\nTesting prepend');
testPrepend();

console.log('\nTesting size');
testSize();

console.log('\nTesting getHead');
testHead();

console.log('\nTesting getTail');
testTail();

console.log('\nTesting at');
testAtIndex();

console.log('\nTesting pop');
testPop();

console.log('\nTesting contains');
testContains();

console.log('\nTesting find');
testFind();

console.log('\nTesting insertAt');
testInsertAt();

console.log('\nTesting removeAt');
testRemoveAt();

// we don't include testToString because it's been used in each of the tests before.

function testAppend() {
  list.empty();
  list.append('A');
  list.append('B');
  list.append('C');
  list.append('D');
  list.append('E');
  list.append('F');
  list.append('G');
  list.append('H');
  list.append('I');
  list.append('J');
  list.append('K');
  list.append('L');
  console.log(list.toString());
  console.log(list.stringAllNodes());
}

function testPrepend() {
  list.empty();
  list.prepend('A');
  list.prepend('B');
  list.prepend('C');
  list.prepend('D');
  list.prepend('E');
  list.prepend('F');
  list.prepend('G');
  list.prepend('H');
  list.prepend('I');
  list.prepend('J');
  list.prepend('K');
  list.prepend('L');
  console.log(list.toString());
  console.log(list.stringAllNodes());
}

function testSize() {
  list.empty();
  testAppend();
  console.log('Total size: ' + list.getSize());
}

function testHead() {
  list.empty();
  testAppend();
  console.log('The head is: ' + list.getHead());
}

function testTail() {
  list.empty();
  testAppend();
  console.log('The tail is: ' + list.getTail());
}

function testAtIndex() {
  list.empty();
  testAppend();
  console.log('Element at index 5 is: ' + list.at(5));
}

function testPop() {
  list.empty();
  testAppend();
  console.log('We pop and show again the list');
  list.pop();
  console.log(list.toString());
  console.log(list.stringAllNodes());
}

function testContains() {
  list.empty();
  testAppend();
  console.log('do we contain a C? ' + list.contains('C'));
  console.log('do we contain a @? ' + list.contains('@'));
}

function testFind() {
  list.empty();
  testAppend();
  console.log('At what index is C? ' + list.find('C'));
  console.log('At what index is @? ' + list.find('@'));
}

function testInsertAt() {
  list.empty();
  testAppend();
  console.log('----inserting @ at 5 index----');
  list.insertAt('@', 5);
  console.log(list.toString());
  console.log(list.stringAllNodes());
}

function testRemoveAt() {
  list.empty();
  testAppend();
  console.log('removing 10 index --> ' + list.at(10));
  list.removeAt(10);
  console.log(list.toString());
  console.log(list.stringAllNodes());
}
