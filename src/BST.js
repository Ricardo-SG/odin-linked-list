'use strict';

/* eslint-enable */

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

  isLeaf(node) {
    if (this.leftPath == null && this.rightPath == null) return true;
    else return false;
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
    if (isOkay(list) === false || list.length === 0) {
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

    this.xisrt(new Node(value, null, null), this.root);
  }

  xisrt(newNode, node) {
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
            this.xisrt(newNode, node.rightPath); // the search continues
          }

          return;
        case -1:
          // newNode is bigger than the actual node
          if (!isOkay(node.leftPath)) {
            node.lefttPath = newNode;
          } else {
            this.xisrt(newNode, node.leftPath); // the search continues
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

    this.root = this.xdelete(value, this.root);
  }

  xdelete(value, node) {
    if (!isOkay(node)) return null; // base case, we have not found the node to delete

    switch (node.compareV(value)) {
      case 0: // we found the node to delete
        return this.deleteNode(node);
      case 1: // the node.Value is bigger than the value we're looking for. Therefore, left.
        node.leftPath = this.xdelete(value, node.leftPath);
        return node;
      case -1: // the node.Value is smaller than the value we're looking for. Therefore, right.
        node.rightPath = this.xdelete(value, node.rightPath);
        return node;
    }
  }

  deleteNode(node) {
    // case: the Node has both paths
    if (isOkay(node.rightPath) && isOkay(node.leftPath)) {
      const smallestNode = this.searchSmallest(node.rightPath); // we get the smallest node in the right path
      node.value = smallestNode.value; // We swap the values
      node.rightPath = this.xdelete(node.value, node.rightPath); // we command it to delete the smallest node
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

  find(value) {
    // we return null if value is null or undefined or if root is null or undefined (which means we don't have a BST)
    if (!isOkay(value)) return null;
    if (!isOkay(this.root)) return null;

    return this.xfind(value, this.root);
  }

  xfind(value, node) {
    if (!isOkay(node)) return null; // base case, the value isn't in the bst

    switch (node.compareV(value)) {
      case 0:
        return node; // and we're done
      case 1:
        return this.xfind(value, node.leftPath);
      case -1:
        return this.xfind(value, node.rightPath);
    }
  }

  // level Order traverse the BST by breadth first and applies the callback to each node
  levelOrder(cb) {
    // cb stands for callback
    if (!isOkay(cb)) {
      cb = (v) => {
        return v.toString();
      };
    }
    if (!isOkay(this.root)) return;

    const firstQueue = [this.root];
    return this.xlevelOrder(cb, firstQueue); // we begin by the root
  }

  xlevelOrder(cb, queue) {
    const results = [];
    const nextQueue = [];

    queue.forEach((node) => {
      results.push(cb(node)); // we apply the cb to the current node of the queue
      if (isOkay(node.leftPath)) nextQueue.push(node.leftPath);
      if (isOkay(node.rightPath)) nextQueue.push(node.rightPath);
    });

    if (nextQueue.length > 0) {
      return results.concat(this.xlevelOrder(cb, nextQueue));
    }

    return results;
  }

  // inorder traverse the BST always priorizing attending the left path, then the node, then the right path
  inorder(cb) {
    // cb stands for callback
    if (!isOkay(cb)) {
      cb = (v) => {
        return v.toString();
      };
    }
    if (!isOkay(this.root)) return;

    return this.xinorder(cb, this.root); // we begin by the root
  }

  xinorder(cb, node) {
    let resultsLeft = [];
    let resultsNode = [];
    let resultsRight = [];
    let results = [];

    // we always act on left node first
    if (isOkay(node.leftPath))
      resultsLeft = resultsLeft.concat(this.xinorder(cb, node.leftPath));

    // now we treat the node
    resultsNode = resultsNode.concat(cb(node));

    // now we treat the right node
    if (isOkay(node.rightPath))
      resultsRight = resultsRight.concat(this.xinorder(cb, node.rightPath));

    results = resultsLeft.concat(resultsNode).concat(resultsRight);

    return results;
  }

  // preorder traverse the BST always priorizing attending the node, then the left path, then the right path
  preorder(cb) {
    // cb stands for callback
    if (!isOkay(cb)) {
      cb = (v) => {
        return v.toString();
      };
    }
    if (!isOkay(this.root)) return;

    return this.xpreorder(cb, this.root); // we begin by the root
  }

  xpreorder(cb, node) {
    let resultsLeft = [];
    let resultsNode = [];
    let resultsRight = [];
    let results = [];

    // First we treat the node
    resultsNode = resultsNode.concat(cb(node));

    // Then we go treat the node at its left
    if (isOkay(node.leftPath))
      resultsLeft = resultsLeft.concat(this.xpreorder(cb, node.leftPath));

    // Then we go treat the node at its right
    if (isOkay(node.rightPath))
      resultsRight = resultsRight.concat(this.xpreorder(cb, node.rightPath));

    results = resultsNode.concat(resultsLeft).concat(resultsRight);

    return results;
  }

  // postorder traverse the BST always priorizing attending the left path, then the right path, then the node
  postorder(cb) {
    // cb stands for callback
    if (!isOkay(cb)) {
      cb = (v) => {
        return v.toString();
      };
    }
    if (!isOkay(this.root)) return;

    return this.xpostorder(cb, this.root); // we begin by the root
  }

  xpostorder(cb, node) {
    let resultsLeft = [];
    let resultsNode = [];
    let resultsRight = [];
    let results = [];

    // First we always treat left
    if (isOkay(node.leftPath))
      resultsLeft = resultsLeft.concat(this.xpostorder(cb, node.leftPath));

    // Then we always treat right
    if (isOkay(node.rightPath))
      resultsRight = resultsRight.concat(this.xpostorder(cb, node.rightPath));

    // and lastly, we treat the node
    resultsNode = resultsNode.concat(cb(node));

    results = resultsLeft.concat(resultsRight).concat(resultsNode);

    return results;
  }

  // Height is defined as the number of edges in longest path from a given node to a leaf node
  height(value) {
    if (!isOkay(value)) return null;

    return this.xheight(value, this.root);
  }

  xheight(value, treeNode) {
    // here we're still looking for the node
    switch (treeNode.compareV(value)) {
      case 0:
        // we have found the node, we can start counting
        return this.calcHeight(treeNode);
      case 1:
        // our node value is less than the treeNode we're looking for
        return this.xheight(value, treeNode.leftPath);
      case -1:
        // our node value is greater than the treeNode we're looking for
        return this.xheight(value, treeNode.rightPath);
    }
  }

  calcHeight(node) {
    if (!isOkay(node)) return 0;

    let leftHeight = 0;
    let rightHeight = 0;

    if (isOkay(node.leftPath)) {
      leftHeight++;
      leftHeight += this.calcHeight(node.leftPath);
    }
    if (isOkay(node.rightPath)) {
      rightHeight++;
      rightHeight += this.calcHeight(node.rightPath);
    }

    if (leftHeight > rightHeight) return leftHeight;
    else return rightHeight;
  }

  depth(value) {
    if (!isOkay(value)) return null;

    return this.xdepth(value, this.root);
  }

  // Depth is defined as the number of edges in path from a given node to the tree’s root node.
  xdepth(value, node) {
    switch (node.compareV(value)) {
      case 0:
        // base case, this is the node we're calculating the depth for
        return 0;
      case 1:
        // We got to turn left to find our node
        return this.xdepth(value, node.leftPath) + 1;
      case -1:
        // We got to turn right to find our node
        return this.xdepth(value, node.rightPath) + 1;
    }
  }

  isBalanced() {
    if (!isOkay(this.root)) return null; // no bst to evaluate

    return this.xisBalanced(this.root);
  }

  xisBalanced(node) {
    // base case
    if (node.isLeaf()) {
      return true; // a leaf is balanced in itself
    }

    if (isOkay(node.leftPath)) {
      if (!this.xisBalanced(node.leftPath)) return false; // no need to continue
    }

    if (isOkay(node.rightPath)) {
      if (!this.xisBalanced(node.rightPath)) return false; // no need to continue
    }

    const leftHeight = this.calcHeight(node.leftPath);
    const rightHeight = this.calcHeight(node.rightPath);
    const hdiff = Math.abs(leftHeight - rightHeight);

    if (hdiff > 1) {
      return false;
    }

    // if we got here, everything is balanced as all things should be
    return true;
  }

  rebalance() {
    // first we recover an array of all the actual values the tree has
    // then we buildTree again
    this.rawData = this.inorder();
    this.data = this.mergeSort(this.rawData);
    this.root = this.buildTree(this.data);
  }
}

function odinTest() {
  /*
Create a binary search tree from an array of random numbers. 
You can create a function if you want that returns an array of random numbers each time you call it.
Confirm that the tree is balanced by calling isBalanced
Print out all elements in level, pre, post, and in order
Unbalance the tree by adding several numbers > 100
Confirm that the tree is unbalanced by calling isBalanced
Balance the tree by calling rebalance
Confirm that the tree is balanced by calling isBalanced
Print out all elements in level, pre, post, and in order
*/
  // const odinArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
  const odinArray = [];

  for (let i = 0; i < 20; i++) {
    odinArray.push(Math.floor(Math.random() * 100));
  }

  const odinTree = new Tree(odinArray);
  console.log('Random odinTree created: ');
  prettyPrint(odinTree.root);
  console.log('is it balanced? ' + odinTree.isBalanced());

  console.log('Traversing in levelOrder: ');
  console.log(odinTree.levelOrder().toString());

  console.log('Traversing in inorder: ');
  console.log(odinTree.inorder().toString());

  console.log('Traversing in preorder: ');
  console.log(odinTree.preorder().toString());

  console.log('Traversing in postorder: ');
  console.log(odinTree.postorder().toString());

  console.log('we are gonna unbalance this tree');
  for (let i = 100; i < 120; i++) odinTree.insert(i);

  console.log('now the tree is like this: ');
  prettyPrint(odinTree.root);
  console.log('is it balanced? ' + odinTree.isBalanced());
  console.log('lets rebalance it');
  odinTree.rebalance();
  prettyPrint(odinTree.root);

  console.log('Traversing in levelOrder: ');
  console.log(odinTree.levelOrder().toString());

  console.log('Traversing in inorder: ');
  console.log(odinTree.inorder().toString());

  console.log('Traversing in preorder: ');
  console.log(odinTree.preorder().toString());

  console.log('Traversing in postorder: ');
  console.log(odinTree.postorder().toString());
}

function isOkay(arg) {
  if (arg == null) return false;
  else return true;
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

export { odinTest };
