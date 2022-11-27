'use strict';

/* eslint-disable */

class Node {
  constructor(value, leftPath, rightPath) {
    this.value = value;
    this.leftPath = leftPath;
    this.rightPath = rightPath;
  }

  toString() {
    if (isOkay(this)) {
      return this.value;
    } else {
      return null;
    }
  }

  compare(node) {
    if (this.value === node.value) return 0;
    if (this.value > node.value) return 1;
    if (this.value < node.value) return -1;
  }
  compareV(value) {
    if (this.value === value) return 0;
    if (this.value > value) return 1;
    if (this.value < value) return -1;
  }

  assign(node) {
    this.value = node.value;
    this.leftPath = node.leftPath;
    this.rightPath = node.rightPath;
  }
}

class Tree {
  constructor(rawData) {
    this.rawData = rawData; // because I don't like losing data.
    this.data = this.mergeSort(rawData);
    this.root = this.buildTree(this.data);
  }

  buildTree(list) {
    // if the argument is a null or undefined nothing to do here
    if (isOkay(list) === false) {
      return null;
    }

    // 1) base case: if number of elements in array is 1, we return that node.
    if (list.length <= 1) {
      return new Node(list[0], null, null);
    }

    // 2) for more than 1 element arrays, we divide it in two, left and right, and call recursively to treat them
    const middle = Math.floor(list.length / 2);
    const leftList = list.slice(0, middle);
    const rightList = list.slice(middle + 1, list.length);

    const leftNode = isOkay(leftList) ? this.buildTree(leftList) : null;
    const rightNode = isOkay(rightList) ? this.buildTree(rightList) : null;
    const thisNode = new Node(list[middle], leftNode, rightNode);

    return thisNode;
  }
  // The code have been copied and adapted from https://medium.com/@manishsundriyal/merge-sort-in-javascript-9ae48897c5e9
  // I already knew top-down merge algorithm thanks to The Odin Project.
  mergeSort(rawData) {
    const mergeSortedList = function (leftList, rightList) {
      let sortedList = [];
      // create sorted array with left and right sublist
      while (leftList.length && rightList.length) {
        if (leftList[0] <= rightList[0]) {
          sortedList.push(leftList.shift());
        } else {
          sortedList.push(rightList.shift());
        }
      }
      // add the remaining elements, if any
      if (leftList.length) {
        sortedList = sortedList.concat(leftList);
      }
      if (rightList.length) {
        sortedList = sortedList.concat(rightList);
      }
      return sortedList;
    };

    const list = [...new Set(rawData)];

    // base case
    if (list.length <= 1) {
      return list;
    }

    const middle = Math.floor(list.length / 2);
    const leftList = list.slice(0, middle);
    const rightList = list.slice(middle, list.length);
    const leftSortedList = this.mergeSort(leftList); // left sublist
    const rightSortedList = this.mergeSort(rightList); // right sublist

    return mergeSortedList(leftSortedList, rightSortedList);
  }

  insert(value) {
    // capsule insert function
    if (!isOkay(value)) return; // guard clause

    this.isrt(new Node(value, null, null), this.root);
  }

  isrt(newNode, node) {
    // true insert function
    if (!isOkay(newNode)) return; // guard clause

    if (node === null) {
      // Base case
      node = newNode;
      return; // and we're done.
    } else {
      switch (newNode.compare(node)) {
        case 0:
          // The same value
          // We do not insert duplicated values
          return;
        case 1:
          // newNode is bigger than the actual node
          if (!isOkay(node.rightPath)) {
            node.rightPath = newNode;
          } else {
            this.isrt(newNode, node.rightPath); // the search continues
          }

          return;
        case -1:
          // newNode is bigger than the actual node
          if (!isOkay(node.leftPath)) {
            node.lefttPath = newNode;
          } else {
            this.isrt(newNode, node.leftPath); // the search continues
          }
          return;
        default: // we never get here
          return;
      }
    }
  }

  delete(value) {
    if (!isOkay(value)) {
      return;
    }

    this.root = this.dlt(value, this.root);
  }

  dlt(value, node) {
    if (!isOkay(node)) return null; // base case, we have not found the node to delete

    switch (node.compareV(value)) {
      case 0: // we found the node to delete
        return this.deleteNode(node);
      case 1: // the node.Value is bigger than the value we're looking for. Therefore, left.
        node.leftPath = this.dlt(value, node.leftPath);
        return node;
      case -1: // the node.Value is smaller than the value we're looking for. Therefore, right.
        node.rightPath = this.dlt(value, node.rightPath);
        return node;
    }
  }

  deleteNode(node) {
    // case: the Node has both paths
    if (isOkay(node.rightPath) && isOkay(node.leftPath)) {
      const smallestNode = this.searchSmallest(node.rightPath); // we get the smallest node in the right path
      node.value = smallestNode.value; // We swap the values
      node.rightPath = this.dlt(node.value, node.rightPath); // we command it to delete the smallest node
      return node; // we return the node
    }

    // case: Node only has right path
    if (isOkay(node.rightPath)) {
      return node.rightPath;
    }

    // Case: Node only has left path
    if (isOkay(node.leftPath)) {
      return node.leftPath;
    }

    // Case: Node doesn't have left nor right path
    return null;
  }

  searchSmallest(node) {
    // we gonna go throught left paths until null.
    if (!isOkay(node.leftPath)) {
      return node;
    } else {
      return this.searchSmallest(node.leftPath);
    }
  }
}

function testBST() {
  const odinArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
  //const odinArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const odinTree = new Tree(odinArray);
  console.log('Root: ' + odinTree.root);
  console.log('odinTree       --> ' + odinTree.data);
  prettyPrint(odinTree.root);
  console.log('we insert 10');
  odinTree.insert(10, odinTree.root);
  prettyPrint(odinTree.root);
  console.log('we delete 67');
  odinTree.delete(67);
  prettyPrint(odinTree.root);
}

function isOkay(arg) {
  if (arg !== null && arg !== undefined) {
    return true;
  } else {
    return false;
  }
}

function prettyPrint(node, prefix = '', isLeft = true) {
  const value = isOkay(node) ? node.value : null;

  if (isOkay(node.rightPath)) {
    prettyPrint(node.rightPath, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }

  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${value}`);
  if (isOkay(node.leftPath)) {
    prettyPrint(node.leftPath, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

export { testBST };
