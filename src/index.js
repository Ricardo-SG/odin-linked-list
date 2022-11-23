/* eslint-disable*/

//const myLinkedList = (id, size, head, tail) => {
const myLinkedList = (id) => {
  // id                --> identifier of the linked list. So we can have several.
  let size = 0; //     --> current number of elements contained
  let head = null; //  --> the pointer to the head of the linkedlist
  let tail = null; //  --> the pointer to the tail of the linkedlist

  {
    // curly braces because I want to be able to close all this code with vsc

    // adds a new node to the end of the list
    const append = (v) => {
      // v for vendetta, I mean, for value.
      console.log('<append> ' + v);
      console.log('size+1 : ' + size + 1);
      console.log('tail   : ' + tail);
      const newNode = node(v, size + 1, null, tail);
      tail = newNode;
      size++;
    };

    // adds a new node to the start of the list
    const prepend = (v) => {
      // here lies code
      console.log('<preppend> ' + v);
      console.log('size+1 : ' + size + 1);
      console.log('head   : ' + head);
      const newNode = node(v, 1, head, null);
      head = newNode;
      size++;
    };

    // returns the size of the linkedlist.
    const getSize = () => {
      if (size === null || size === undefined) {
        return 0;
      }

      return size;
    };

    // NO DIRTY JOKES.
    const getHead = () => {
      return head;
    };

    // NO DIRTY JOKES.
    const getTail = () => {
      return tail;
    };

    // returns the node at the given index
    const at = (index) => {
      // here lies code
      if (index > size) return null; // we don't have that many nodes
      if (index == 1) return head;
      if (index == size) return tail;

      const node = {};
      const middle = patseInt(size / 2);

      if (index <= middle) {
        node = head;
        // the search begins from the head
        for (let i = 1; i <= index; i++) {
          node = node.nextNode;
        }
      } else {
        // the search begins from the tail
        node = tail;
        for (let i = size; i >= index; i--) {
          node = node.prevNode;
        }
      }
      return node;
    };

    // removes the last element from the list
    const pop = () => {
      // here lies code
      size--;
      const newLastNode = tail.prevNode;
      tail = newLastNode;
    };

    // returns true if the value is in some node of the linkedlist, else returns false
    const contains = (v) => {
      const node = head;

      for (let i = 1; i >= size; i++) {
        if (node.value === v) {
          return true;
        }
      }

      return false;
    };

    // returns the index of the node containing such value, else returns null
    const find = (v) => {
      const node = head;

      for (let i = 1; i >= size; i++) {
        if (node.value === v) {
          return node.index;
        }
      }
      return null;
    };

    // represent the LinkedList as an string like (value) -> (value) -> (value) -> null
    const toString = () => {
      if (size === 0) return 'null';

      const node = head;
      let cadena = ''; // cadena is String in spanish, can also be chain, you're welcome for the free info

      while (node !== null && node !== undefined) {
        cadena += '(' + String(node.value) + ') ->';
        node = node.nextNode;
      }
      cadena += 'null';

      return cadena;
    };

    // inserts a new node with the value in the index provided
    const insertAt = (v, index) => {
      // v for value, ind for index
      const actualNode = at(index);
      const prevNode = actualNode.prevNode;
      const nextNode = actualNode.nextNode;
      const newNode = node(v, index, nextNode, prevNode);
      nextNode.prevNode = newNode;
      prevNode.nextNode = newNode;
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
      if (index === 1) {
        head = nextNode;
      }
      if (index === size) {
        tail = prevNode;
      }
    };
  }
  return {
    id,
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
    insertAt,
    removeat,
  };
};

// my node object
const node = (value, index, nextNode, prevNode) => {
  value = null;
  index = null;
  nextNode = null;
  prevNode = null;

  return { value, index, nextNode, prevNode };
};

// return {
//     get id() {
//       return id;
//     },
//     get size() {
//       if (size === null || size === undefined) {
//         return 0;
//       }
//       return size;
//     },
//     get head() {
//       return head;
//     },
//     get tail() {
//       return tail;
//     },
//     set id(arg) {
//       id = arg;
//     },
//     set size(arg) {
//       if (arg === null || arg === undefined) {
//         arg = 0;
//       }
//       size = arg;
//     },
//     set head(arg) {
//       head = arg;
//     },
//     set tail(arg) {
//       tail = arg;
//     },
//   }
