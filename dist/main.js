/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/BST.js":
/*!********************!*\
  !*** ./src/BST.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "odinTest": () => (/* binding */ odinTest)
/* harmony export */ });


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
    if (this.leftPath == null && this.rightPath == null) return true;else return false;
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
        default:
          // we never get here
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
      case 0:
        // we found the node to delete
        return this.deleteNode(node);
      case 1:
        // the node.Value is bigger than the value we're looking for. Therefore, left.
        node.leftPath = this.xdelete(value, node.leftPath);
        return node;
      case -1:
        // the node.Value is smaller than the value we're looking for. Therefore, right.
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
        return node;
      // and we're done
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
      cb = v => {
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
    queue.forEach(node => {
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
      cb = v => {
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
    if (isOkay(node.leftPath)) resultsLeft = resultsLeft.concat(this.xinorder(cb, node.leftPath));

    // now we treat the node
    resultsNode = resultsNode.concat(cb(node));

    // now we treat the right node
    if (isOkay(node.rightPath)) resultsRight = resultsRight.concat(this.xinorder(cb, node.rightPath));
    results = resultsLeft.concat(resultsNode).concat(resultsRight);
    return results;
  }

  // preorder traverse the BST always priorizing attending the node, then the left path, then the right path
  preorder(cb) {
    // cb stands for callback
    if (!isOkay(cb)) {
      cb = v => {
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
    if (isOkay(node.leftPath)) resultsLeft = resultsLeft.concat(this.xpreorder(cb, node.leftPath));

    // Then we go treat the node at its right
    if (isOkay(node.rightPath)) resultsRight = resultsRight.concat(this.xpreorder(cb, node.rightPath));
    results = resultsNode.concat(resultsLeft).concat(resultsRight);
    return results;
  }

  // postorder traverse the BST always priorizing attending the left path, then the right path, then the node
  postorder(cb) {
    // cb stands for callback
    if (!isOkay(cb)) {
      cb = v => {
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
    if (isOkay(node.leftPath)) resultsLeft = resultsLeft.concat(this.xpostorder(cb, node.leftPath));

    // Then we always treat right
    if (isOkay(node.rightPath)) resultsRight = resultsRight.concat(this.xpostorder(cb, node.rightPath));

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
    if (leftHeight > rightHeight) return leftHeight;else return rightHeight;
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
  if (arg == null) return false;else return true;
}
function prettyPrint(node) {
  let prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  let isLeft = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  const value = isOkay(node) ? node.value : null;
  if (isOkay(node.rightPath)) {
    prettyPrint(node.rightPath, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${value}`);
  if (isOkay(node.leftPath)) {
    prettyPrint(node.leftPath, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BST_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BST.js */ "./src/BST.js");


// import { testLinkedList } from './LinkedList.js';

(0,_BST_js__WEBPACK_IMPORTED_MODULE_0__.odinTest)();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFJO0VBRTlDLElBQUlJLE1BQU0sQ0FBQ0UsSUFBSSxDQUFDSixTQUFTLENBQUMsRUFBRTtJQUMxQmtGLFdBQVcsQ0FBQzlFLElBQUksQ0FBQ0osU0FBUyxFQUFHLEdBQUVvRixNQUFPLEdBQUVDLE1BQU0sR0FBRyxNQUFNLEdBQUcsTUFBTyxFQUFDLEVBQUUsS0FBSyxDQUFDO0VBQzVFO0VBRUFMLE9BQU8sQ0FBQ0MsR0FBRyxDQUFFLEdBQUVHLE1BQU8sR0FBRUMsTUFBTSxHQUFHLE1BQU0sR0FBRyxNQUFPLEdBQUV2RixLQUFNLEVBQUMsQ0FBQztFQUMzRCxJQUFJSSxNQUFNLENBQUNFLElBQUksQ0FBQ0wsUUFBUSxDQUFDLEVBQUU7SUFDekJtRixXQUFXLENBQUM5RSxJQUFJLENBQUNMLFFBQVEsRUFBRyxHQUFFcUYsTUFBTyxHQUFFQyxNQUFNLEdBQUcsTUFBTSxHQUFHLE1BQU8sRUFBQyxFQUFFLElBQUksQ0FBQztFQUMxRTtBQUNGOzs7Ozs7O1VDamlCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTmE7O0FBRWI7QUFDb0M7QUFFcENWLGlEQUFRLEVBQUUsQyIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4tbGlua2VkLWxpc3QvLi9zcmMvQlNULmpzIiwid2VicGFjazovL29kaW4tbGlua2VkLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi1saW5rZWQtbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi1saW5rZWQtbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4tbGlua2VkLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLWxpbmtlZC1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLyogZXNsaW50LWVuYWJsZSAqL1xuXG5jbGFzcyBOb2RlIHtcbiAgY29uc3RydWN0b3IodmFsdWUsIGxlZnRQYXRoLCByaWdodFBhdGgpIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5sZWZ0UGF0aCA9IGxlZnRQYXRoO1xuICAgIHRoaXMucmlnaHRQYXRoID0gcmlnaHRQYXRoO1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgaWYgKGlzT2theSh0aGlzKSkge1xuICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBhcmUobm9kZSkge1xuICAgIGlmICh0aGlzLnZhbHVlID09PSBub2RlLnZhbHVlKSByZXR1cm4gMDtcbiAgICBpZiAodGhpcy52YWx1ZSA+IG5vZGUudmFsdWUpIHJldHVybiAxO1xuICAgIGlmICh0aGlzLnZhbHVlIDwgbm9kZS52YWx1ZSkgcmV0dXJuIC0xO1xuICB9XG4gIGNvbXBhcmVWKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMudmFsdWUgPT09IHZhbHVlKSByZXR1cm4gMDtcbiAgICBpZiAodGhpcy52YWx1ZSA+IHZhbHVlKSByZXR1cm4gMTtcbiAgICBpZiAodGhpcy52YWx1ZSA8IHZhbHVlKSByZXR1cm4gLTE7XG4gIH1cblxuICBhc3NpZ24obm9kZSkge1xuICAgIHRoaXMudmFsdWUgPSBub2RlLnZhbHVlO1xuICAgIHRoaXMubGVmdFBhdGggPSBub2RlLmxlZnRQYXRoO1xuICAgIHRoaXMucmlnaHRQYXRoID0gbm9kZS5yaWdodFBhdGg7XG4gIH1cblxuICBpc0xlYWYobm9kZSkge1xuICAgIGlmICh0aGlzLmxlZnRQYXRoID09IG51bGwgJiYgdGhpcy5yaWdodFBhdGggPT0gbnVsbCkgcmV0dXJuIHRydWU7XG4gICAgZWxzZSByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuY2xhc3MgVHJlZSB7XG4gIGNvbnN0cnVjdG9yKHJhd0RhdGEpIHtcbiAgICB0aGlzLnJhd0RhdGEgPSByYXdEYXRhOyAvLyBiZWNhdXNlIEkgZG9uJ3QgbGlrZSBsb3NpbmcgZGF0YS5cbiAgICB0aGlzLmRhdGEgPSB0aGlzLm1lcmdlU29ydChyYXdEYXRhKTtcbiAgICB0aGlzLnJvb3QgPSB0aGlzLmJ1aWxkVHJlZSh0aGlzLmRhdGEpO1xuICB9XG5cbiAgYnVpbGRUcmVlKGxpc3QpIHtcbiAgICAvLyBpZiB0aGUgYXJndW1lbnQgaXMgYSBudWxsIG9yIHVuZGVmaW5lZCBub3RoaW5nIHRvIGRvIGhlcmVcbiAgICBpZiAoaXNPa2F5KGxpc3QpID09PSBmYWxzZSB8fCBsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gMSkgYmFzZSBjYXNlOiBpZiBudW1iZXIgb2YgZWxlbWVudHMgaW4gYXJyYXkgaXMgMSwgd2UgcmV0dXJuIHRoYXQgbm9kZS5cbiAgICBpZiAobGlzdC5sZW5ndGggPD0gMSkge1xuICAgICAgcmV0dXJuIG5ldyBOb2RlKGxpc3RbMF0sIG51bGwsIG51bGwpO1xuICAgIH1cblxuICAgIC8vIDIpIGZvciBtb3JlIHRoYW4gMSBlbGVtZW50IGFycmF5cywgd2UgZGl2aWRlIGl0IGluIHR3bywgbGVmdCBhbmQgcmlnaHQsIGFuZCBjYWxsIHJlY3Vyc2l2ZWx5IHRvIHRyZWF0IHRoZW1cbiAgICBjb25zdCBtaWRkbGUgPSBNYXRoLmZsb29yKGxpc3QubGVuZ3RoIC8gMik7XG4gICAgY29uc3QgbGVmdExpc3QgPSBsaXN0LnNsaWNlKDAsIG1pZGRsZSk7XG4gICAgY29uc3QgcmlnaHRMaXN0ID0gbGlzdC5zbGljZShtaWRkbGUgKyAxLCBsaXN0Lmxlbmd0aCk7XG5cbiAgICBjb25zdCBsZWZ0Tm9kZSA9IGlzT2theShsZWZ0TGlzdCkgPyB0aGlzLmJ1aWxkVHJlZShsZWZ0TGlzdCkgOiBudWxsO1xuICAgIGNvbnN0IHJpZ2h0Tm9kZSA9IGlzT2theShyaWdodExpc3QpID8gdGhpcy5idWlsZFRyZWUocmlnaHRMaXN0KSA6IG51bGw7XG4gICAgY29uc3QgdGhpc05vZGUgPSBuZXcgTm9kZShsaXN0W21pZGRsZV0sIGxlZnROb2RlLCByaWdodE5vZGUpO1xuXG4gICAgcmV0dXJuIHRoaXNOb2RlO1xuICB9XG5cbiAgLy8gVGhlIGNvZGUgaGF2ZSBiZWVuIGNvcGllZCBhbmQgYWRhcHRlZCBmcm9tIGh0dHBzOi8vbWVkaXVtLmNvbS9AbWFuaXNoc3VuZHJpeWFsL21lcmdlLXNvcnQtaW4tamF2YXNjcmlwdC05YWU0ODg5N2M1ZTlcbiAgLy8gSSBhbHJlYWR5IGtuZXcgdG9wLWRvd24gbWVyZ2UgYWxnb3JpdGhtIHRoYW5rcyB0byBUaGUgT2RpbiBQcm9qZWN0LlxuICBtZXJnZVNvcnQocmF3RGF0YSkge1xuICAgIGNvbnN0IG1lcmdlU29ydGVkTGlzdCA9IGZ1bmN0aW9uIChsZWZ0TGlzdCwgcmlnaHRMaXN0KSB7XG4gICAgICBsZXQgc29ydGVkTGlzdCA9IFtdO1xuICAgICAgLy8gY3JlYXRlIHNvcnRlZCBhcnJheSB3aXRoIGxlZnQgYW5kIHJpZ2h0IHN1Ymxpc3RcbiAgICAgIHdoaWxlIChsZWZ0TGlzdC5sZW5ndGggJiYgcmlnaHRMaXN0Lmxlbmd0aCkge1xuICAgICAgICBpZiAobGVmdExpc3RbMF0gPD0gcmlnaHRMaXN0WzBdKSB7XG4gICAgICAgICAgc29ydGVkTGlzdC5wdXNoKGxlZnRMaXN0LnNoaWZ0KCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNvcnRlZExpc3QucHVzaChyaWdodExpc3Quc2hpZnQoKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIGFkZCB0aGUgcmVtYWluaW5nIGVsZW1lbnRzLCBpZiBhbnlcbiAgICAgIGlmIChsZWZ0TGlzdC5sZW5ndGgpIHtcbiAgICAgICAgc29ydGVkTGlzdCA9IHNvcnRlZExpc3QuY29uY2F0KGxlZnRMaXN0KTtcbiAgICAgIH1cbiAgICAgIGlmIChyaWdodExpc3QubGVuZ3RoKSB7XG4gICAgICAgIHNvcnRlZExpc3QgPSBzb3J0ZWRMaXN0LmNvbmNhdChyaWdodExpc3QpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNvcnRlZExpc3Q7XG4gICAgfTtcblxuICAgIGNvbnN0IGxpc3QgPSBbLi4ubmV3IFNldChyYXdEYXRhKV07XG5cbiAgICAvLyBiYXNlIGNhc2VcbiAgICBpZiAobGlzdC5sZW5ndGggPD0gMSkge1xuICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgfVxuXG4gICAgY29uc3QgbWlkZGxlID0gTWF0aC5mbG9vcihsaXN0Lmxlbmd0aCAvIDIpO1xuICAgIGNvbnN0IGxlZnRMaXN0ID0gbGlzdC5zbGljZSgwLCBtaWRkbGUpO1xuICAgIGNvbnN0IHJpZ2h0TGlzdCA9IGxpc3Quc2xpY2UobWlkZGxlLCBsaXN0Lmxlbmd0aCk7XG4gICAgY29uc3QgbGVmdFNvcnRlZExpc3QgPSB0aGlzLm1lcmdlU29ydChsZWZ0TGlzdCk7IC8vIGxlZnQgc3VibGlzdFxuICAgIGNvbnN0IHJpZ2h0U29ydGVkTGlzdCA9IHRoaXMubWVyZ2VTb3J0KHJpZ2h0TGlzdCk7IC8vIHJpZ2h0IHN1Ymxpc3RcblxuICAgIHJldHVybiBtZXJnZVNvcnRlZExpc3QobGVmdFNvcnRlZExpc3QsIHJpZ2h0U29ydGVkTGlzdCk7XG4gIH1cblxuICBpbnNlcnQodmFsdWUpIHtcbiAgICAvLyBjYXBzdWxlIGluc2VydCBmdW5jdGlvblxuICAgIGlmICghaXNPa2F5KHZhbHVlKSkgcmV0dXJuOyAvLyBndWFyZCBjbGF1c2VcblxuICAgIHRoaXMueGlzcnQobmV3IE5vZGUodmFsdWUsIG51bGwsIG51bGwpLCB0aGlzLnJvb3QpO1xuICB9XG5cbiAgeGlzcnQobmV3Tm9kZSwgbm9kZSkge1xuICAgIC8vIHRydWUgaW5zZXJ0IGZ1bmN0aW9uXG4gICAgaWYgKCFpc09rYXkobmV3Tm9kZSkpIHJldHVybjsgLy8gZ3VhcmQgY2xhdXNlXG5cbiAgICBpZiAobm9kZSA9PT0gbnVsbCkge1xuICAgICAgLy8gQmFzZSBjYXNlXG4gICAgICBub2RlID0gbmV3Tm9kZTtcbiAgICAgIHJldHVybjsgLy8gYW5kIHdlJ3JlIGRvbmUuXG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXRjaCAobmV3Tm9kZS5jb21wYXJlKG5vZGUpKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAvLyBUaGUgc2FtZSB2YWx1ZVxuICAgICAgICAgIC8vIFdlIGRvIG5vdCBpbnNlcnQgZHVwbGljYXRlZCB2YWx1ZXNcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAvLyBuZXdOb2RlIGlzIGJpZ2dlciB0aGFuIHRoZSBhY3R1YWwgbm9kZVxuICAgICAgICAgIGlmICghaXNPa2F5KG5vZGUucmlnaHRQYXRoKSkge1xuICAgICAgICAgICAgbm9kZS5yaWdodFBhdGggPSBuZXdOb2RlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnhpc3J0KG5ld05vZGUsIG5vZGUucmlnaHRQYXRoKTsgLy8gdGhlIHNlYXJjaCBjb250aW51ZXNcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNhc2UgLTE6XG4gICAgICAgICAgLy8gbmV3Tm9kZSBpcyBiaWdnZXIgdGhhbiB0aGUgYWN0dWFsIG5vZGVcbiAgICAgICAgICBpZiAoIWlzT2theShub2RlLmxlZnRQYXRoKSkge1xuICAgICAgICAgICAgbm9kZS5sZWZ0dFBhdGggPSBuZXdOb2RlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnhpc3J0KG5ld05vZGUsIG5vZGUubGVmdFBhdGgpOyAvLyB0aGUgc2VhcmNoIGNvbnRpbnVlc1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIGRlZmF1bHQ6IC8vIHdlIG5ldmVyIGdldCBoZXJlXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRlbGV0ZSh2YWx1ZSkge1xuICAgIGlmICghaXNPa2F5KHZhbHVlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMucm9vdCA9IHRoaXMueGRlbGV0ZSh2YWx1ZSwgdGhpcy5yb290KTtcbiAgfVxuXG4gIHhkZWxldGUodmFsdWUsIG5vZGUpIHtcbiAgICBpZiAoIWlzT2theShub2RlKSkgcmV0dXJuIG51bGw7IC8vIGJhc2UgY2FzZSwgd2UgaGF2ZSBub3QgZm91bmQgdGhlIG5vZGUgdG8gZGVsZXRlXG5cbiAgICBzd2l0Y2ggKG5vZGUuY29tcGFyZVYodmFsdWUpKSB7XG4gICAgICBjYXNlIDA6IC8vIHdlIGZvdW5kIHRoZSBub2RlIHRvIGRlbGV0ZVxuICAgICAgICByZXR1cm4gdGhpcy5kZWxldGVOb2RlKG5vZGUpO1xuICAgICAgY2FzZSAxOiAvLyB0aGUgbm9kZS5WYWx1ZSBpcyBiaWdnZXIgdGhhbiB0aGUgdmFsdWUgd2UncmUgbG9va2luZyBmb3IuIFRoZXJlZm9yZSwgbGVmdC5cbiAgICAgICAgbm9kZS5sZWZ0UGF0aCA9IHRoaXMueGRlbGV0ZSh2YWx1ZSwgbm9kZS5sZWZ0UGF0aCk7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgICAgY2FzZSAtMTogLy8gdGhlIG5vZGUuVmFsdWUgaXMgc21hbGxlciB0aGFuIHRoZSB2YWx1ZSB3ZSdyZSBsb29raW5nIGZvci4gVGhlcmVmb3JlLCByaWdodC5cbiAgICAgICAgbm9kZS5yaWdodFBhdGggPSB0aGlzLnhkZWxldGUodmFsdWUsIG5vZGUucmlnaHRQYXRoKTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICB9XG5cbiAgZGVsZXRlTm9kZShub2RlKSB7XG4gICAgLy8gY2FzZTogdGhlIE5vZGUgaGFzIGJvdGggcGF0aHNcbiAgICBpZiAoaXNPa2F5KG5vZGUucmlnaHRQYXRoKSAmJiBpc09rYXkobm9kZS5sZWZ0UGF0aCkpIHtcbiAgICAgIGNvbnN0IHNtYWxsZXN0Tm9kZSA9IHRoaXMuc2VhcmNoU21hbGxlc3Qobm9kZS5yaWdodFBhdGgpOyAvLyB3ZSBnZXQgdGhlIHNtYWxsZXN0IG5vZGUgaW4gdGhlIHJpZ2h0IHBhdGhcbiAgICAgIG5vZGUudmFsdWUgPSBzbWFsbGVzdE5vZGUudmFsdWU7IC8vIFdlIHN3YXAgdGhlIHZhbHVlc1xuICAgICAgbm9kZS5yaWdodFBhdGggPSB0aGlzLnhkZWxldGUobm9kZS52YWx1ZSwgbm9kZS5yaWdodFBhdGgpOyAvLyB3ZSBjb21tYW5kIGl0IHRvIGRlbGV0ZSB0aGUgc21hbGxlc3Qgbm9kZVxuICAgICAgcmV0dXJuIG5vZGU7IC8vIHdlIHJldHVybiB0aGUgbm9kZVxuICAgIH1cblxuICAgIC8vIGNhc2U6IE5vZGUgb25seSBoYXMgcmlnaHQgcGF0aFxuICAgIGlmIChpc09rYXkobm9kZS5yaWdodFBhdGgpKSB7XG4gICAgICByZXR1cm4gbm9kZS5yaWdodFBhdGg7XG4gICAgfVxuXG4gICAgLy8gQ2FzZTogTm9kZSBvbmx5IGhhcyBsZWZ0IHBhdGhcbiAgICBpZiAoaXNPa2F5KG5vZGUubGVmdFBhdGgpKSB7XG4gICAgICByZXR1cm4gbm9kZS5sZWZ0UGF0aDtcbiAgICB9XG5cbiAgICAvLyBDYXNlOiBOb2RlIGRvZXNuJ3QgaGF2ZSBsZWZ0IG5vciByaWdodCBwYXRoXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBzZWFyY2hTbWFsbGVzdChub2RlKSB7XG4gICAgLy8gd2UgZ29ubmEgZ28gdGhyb3VnaHQgbGVmdCBwYXRocyB1bnRpbCBudWxsLlxuICAgIGlmICghaXNPa2F5KG5vZGUubGVmdFBhdGgpKSB7XG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoU21hbGxlc3Qobm9kZS5sZWZ0UGF0aCk7XG4gICAgfVxuICB9XG5cbiAgZmluZCh2YWx1ZSkge1xuICAgIC8vIHdlIHJldHVybiBudWxsIGlmIHZhbHVlIGlzIG51bGwgb3IgdW5kZWZpbmVkIG9yIGlmIHJvb3QgaXMgbnVsbCBvciB1bmRlZmluZWQgKHdoaWNoIG1lYW5zIHdlIGRvbid0IGhhdmUgYSBCU1QpXG4gICAgaWYgKCFpc09rYXkodmFsdWUpKSByZXR1cm4gbnVsbDtcbiAgICBpZiAoIWlzT2theSh0aGlzLnJvb3QpKSByZXR1cm4gbnVsbDtcblxuICAgIHJldHVybiB0aGlzLnhmaW5kKHZhbHVlLCB0aGlzLnJvb3QpO1xuICB9XG5cbiAgeGZpbmQodmFsdWUsIG5vZGUpIHtcbiAgICBpZiAoIWlzT2theShub2RlKSkgcmV0dXJuIG51bGw7IC8vIGJhc2UgY2FzZSwgdGhlIHZhbHVlIGlzbid0IGluIHRoZSBic3RcblxuICAgIHN3aXRjaCAobm9kZS5jb21wYXJlVih2YWx1ZSkpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgcmV0dXJuIG5vZGU7IC8vIGFuZCB3ZSdyZSBkb25lXG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiB0aGlzLnhmaW5kKHZhbHVlLCBub2RlLmxlZnRQYXRoKTtcbiAgICAgIGNhc2UgLTE6XG4gICAgICAgIHJldHVybiB0aGlzLnhmaW5kKHZhbHVlLCBub2RlLnJpZ2h0UGF0aCk7XG4gICAgfVxuICB9XG5cbiAgLy8gbGV2ZWwgT3JkZXIgdHJhdmVyc2UgdGhlIEJTVCBieSBicmVhZHRoIGZpcnN0IGFuZCBhcHBsaWVzIHRoZSBjYWxsYmFjayB0byBlYWNoIG5vZGVcbiAgbGV2ZWxPcmRlcihjYikge1xuICAgIC8vIGNiIHN0YW5kcyBmb3IgY2FsbGJhY2tcbiAgICBpZiAoIWlzT2theShjYikpIHtcbiAgICAgIGNiID0gKHYpID0+IHtcbiAgICAgICAgcmV0dXJuIHYudG9TdHJpbmcoKTtcbiAgICAgIH07XG4gICAgfVxuICAgIGlmICghaXNPa2F5KHRoaXMucm9vdCkpIHJldHVybjtcblxuICAgIGNvbnN0IGZpcnN0UXVldWUgPSBbdGhpcy5yb290XTtcbiAgICByZXR1cm4gdGhpcy54bGV2ZWxPcmRlcihjYiwgZmlyc3RRdWV1ZSk7IC8vIHdlIGJlZ2luIGJ5IHRoZSByb290XG4gIH1cblxuICB4bGV2ZWxPcmRlcihjYiwgcXVldWUpIHtcbiAgICBjb25zdCByZXN1bHRzID0gW107XG4gICAgY29uc3QgbmV4dFF1ZXVlID0gW107XG5cbiAgICBxdWV1ZS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICByZXN1bHRzLnB1c2goY2Iobm9kZSkpOyAvLyB3ZSBhcHBseSB0aGUgY2IgdG8gdGhlIGN1cnJlbnQgbm9kZSBvZiB0aGUgcXVldWVcbiAgICAgIGlmIChpc09rYXkobm9kZS5sZWZ0UGF0aCkpIG5leHRRdWV1ZS5wdXNoKG5vZGUubGVmdFBhdGgpO1xuICAgICAgaWYgKGlzT2theShub2RlLnJpZ2h0UGF0aCkpIG5leHRRdWV1ZS5wdXNoKG5vZGUucmlnaHRQYXRoKTtcbiAgICB9KTtcblxuICAgIGlmIChuZXh0UXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHJlc3VsdHMuY29uY2F0KHRoaXMueGxldmVsT3JkZXIoY2IsIG5leHRRdWV1ZSkpO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRzO1xuICB9XG5cbiAgLy8gaW5vcmRlciB0cmF2ZXJzZSB0aGUgQlNUIGFsd2F5cyBwcmlvcml6aW5nIGF0dGVuZGluZyB0aGUgbGVmdCBwYXRoLCB0aGVuIHRoZSBub2RlLCB0aGVuIHRoZSByaWdodCBwYXRoXG4gIGlub3JkZXIoY2IpIHtcbiAgICAvLyBjYiBzdGFuZHMgZm9yIGNhbGxiYWNrXG4gICAgaWYgKCFpc09rYXkoY2IpKSB7XG4gICAgICBjYiA9ICh2KSA9PiB7XG4gICAgICAgIHJldHVybiB2LnRvU3RyaW5nKCk7XG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAoIWlzT2theSh0aGlzLnJvb3QpKSByZXR1cm47XG5cbiAgICByZXR1cm4gdGhpcy54aW5vcmRlcihjYiwgdGhpcy5yb290KTsgLy8gd2UgYmVnaW4gYnkgdGhlIHJvb3RcbiAgfVxuXG4gIHhpbm9yZGVyKGNiLCBub2RlKSB7XG4gICAgbGV0IHJlc3VsdHNMZWZ0ID0gW107XG4gICAgbGV0IHJlc3VsdHNOb2RlID0gW107XG4gICAgbGV0IHJlc3VsdHNSaWdodCA9IFtdO1xuICAgIGxldCByZXN1bHRzID0gW107XG5cbiAgICAvLyB3ZSBhbHdheXMgYWN0IG9uIGxlZnQgbm9kZSBmaXJzdFxuICAgIGlmIChpc09rYXkobm9kZS5sZWZ0UGF0aCkpXG4gICAgICByZXN1bHRzTGVmdCA9IHJlc3VsdHNMZWZ0LmNvbmNhdCh0aGlzLnhpbm9yZGVyKGNiLCBub2RlLmxlZnRQYXRoKSk7XG5cbiAgICAvLyBub3cgd2UgdHJlYXQgdGhlIG5vZGVcbiAgICByZXN1bHRzTm9kZSA9IHJlc3VsdHNOb2RlLmNvbmNhdChjYihub2RlKSk7XG5cbiAgICAvLyBub3cgd2UgdHJlYXQgdGhlIHJpZ2h0IG5vZGVcbiAgICBpZiAoaXNPa2F5KG5vZGUucmlnaHRQYXRoKSlcbiAgICAgIHJlc3VsdHNSaWdodCA9IHJlc3VsdHNSaWdodC5jb25jYXQodGhpcy54aW5vcmRlcihjYiwgbm9kZS5yaWdodFBhdGgpKTtcblxuICAgIHJlc3VsdHMgPSByZXN1bHRzTGVmdC5jb25jYXQocmVzdWx0c05vZGUpLmNvbmNhdChyZXN1bHRzUmlnaHQpO1xuXG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH1cblxuICAvLyBwcmVvcmRlciB0cmF2ZXJzZSB0aGUgQlNUIGFsd2F5cyBwcmlvcml6aW5nIGF0dGVuZGluZyB0aGUgbm9kZSwgdGhlbiB0aGUgbGVmdCBwYXRoLCB0aGVuIHRoZSByaWdodCBwYXRoXG4gIHByZW9yZGVyKGNiKSB7XG4gICAgLy8gY2Igc3RhbmRzIGZvciBjYWxsYmFja1xuICAgIGlmICghaXNPa2F5KGNiKSkge1xuICAgICAgY2IgPSAodikgPT4ge1xuICAgICAgICByZXR1cm4gdi50b1N0cmluZygpO1xuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKCFpc09rYXkodGhpcy5yb290KSkgcmV0dXJuO1xuXG4gICAgcmV0dXJuIHRoaXMueHByZW9yZGVyKGNiLCB0aGlzLnJvb3QpOyAvLyB3ZSBiZWdpbiBieSB0aGUgcm9vdFxuICB9XG5cbiAgeHByZW9yZGVyKGNiLCBub2RlKSB7XG4gICAgbGV0IHJlc3VsdHNMZWZ0ID0gW107XG4gICAgbGV0IHJlc3VsdHNOb2RlID0gW107XG4gICAgbGV0IHJlc3VsdHNSaWdodCA9IFtdO1xuICAgIGxldCByZXN1bHRzID0gW107XG5cbiAgICAvLyBGaXJzdCB3ZSB0cmVhdCB0aGUgbm9kZVxuICAgIHJlc3VsdHNOb2RlID0gcmVzdWx0c05vZGUuY29uY2F0KGNiKG5vZGUpKTtcblxuICAgIC8vIFRoZW4gd2UgZ28gdHJlYXQgdGhlIG5vZGUgYXQgaXRzIGxlZnRcbiAgICBpZiAoaXNPa2F5KG5vZGUubGVmdFBhdGgpKVxuICAgICAgcmVzdWx0c0xlZnQgPSByZXN1bHRzTGVmdC5jb25jYXQodGhpcy54cHJlb3JkZXIoY2IsIG5vZGUubGVmdFBhdGgpKTtcblxuICAgIC8vIFRoZW4gd2UgZ28gdHJlYXQgdGhlIG5vZGUgYXQgaXRzIHJpZ2h0XG4gICAgaWYgKGlzT2theShub2RlLnJpZ2h0UGF0aCkpXG4gICAgICByZXN1bHRzUmlnaHQgPSByZXN1bHRzUmlnaHQuY29uY2F0KHRoaXMueHByZW9yZGVyKGNiLCBub2RlLnJpZ2h0UGF0aCkpO1xuXG4gICAgcmVzdWx0cyA9IHJlc3VsdHNOb2RlLmNvbmNhdChyZXN1bHRzTGVmdCkuY29uY2F0KHJlc3VsdHNSaWdodCk7XG5cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfVxuXG4gIC8vIHBvc3RvcmRlciB0cmF2ZXJzZSB0aGUgQlNUIGFsd2F5cyBwcmlvcml6aW5nIGF0dGVuZGluZyB0aGUgbGVmdCBwYXRoLCB0aGVuIHRoZSByaWdodCBwYXRoLCB0aGVuIHRoZSBub2RlXG4gIHBvc3RvcmRlcihjYikge1xuICAgIC8vIGNiIHN0YW5kcyBmb3IgY2FsbGJhY2tcbiAgICBpZiAoIWlzT2theShjYikpIHtcbiAgICAgIGNiID0gKHYpID0+IHtcbiAgICAgICAgcmV0dXJuIHYudG9TdHJpbmcoKTtcbiAgICAgIH07XG4gICAgfVxuICAgIGlmICghaXNPa2F5KHRoaXMucm9vdCkpIHJldHVybjtcblxuICAgIHJldHVybiB0aGlzLnhwb3N0b3JkZXIoY2IsIHRoaXMucm9vdCk7IC8vIHdlIGJlZ2luIGJ5IHRoZSByb290XG4gIH1cblxuICB4cG9zdG9yZGVyKGNiLCBub2RlKSB7XG4gICAgbGV0IHJlc3VsdHNMZWZ0ID0gW107XG4gICAgbGV0IHJlc3VsdHNOb2RlID0gW107XG4gICAgbGV0IHJlc3VsdHNSaWdodCA9IFtdO1xuICAgIGxldCByZXN1bHRzID0gW107XG5cbiAgICAvLyBGaXJzdCB3ZSBhbHdheXMgdHJlYXQgbGVmdFxuICAgIGlmIChpc09rYXkobm9kZS5sZWZ0UGF0aCkpXG4gICAgICByZXN1bHRzTGVmdCA9IHJlc3VsdHNMZWZ0LmNvbmNhdCh0aGlzLnhwb3N0b3JkZXIoY2IsIG5vZGUubGVmdFBhdGgpKTtcblxuICAgIC8vIFRoZW4gd2UgYWx3YXlzIHRyZWF0IHJpZ2h0XG4gICAgaWYgKGlzT2theShub2RlLnJpZ2h0UGF0aCkpXG4gICAgICByZXN1bHRzUmlnaHQgPSByZXN1bHRzUmlnaHQuY29uY2F0KHRoaXMueHBvc3RvcmRlcihjYiwgbm9kZS5yaWdodFBhdGgpKTtcblxuICAgIC8vIGFuZCBsYXN0bHksIHdlIHRyZWF0IHRoZSBub2RlXG4gICAgcmVzdWx0c05vZGUgPSByZXN1bHRzTm9kZS5jb25jYXQoY2Iobm9kZSkpO1xuXG4gICAgcmVzdWx0cyA9IHJlc3VsdHNMZWZ0LmNvbmNhdChyZXN1bHRzUmlnaHQpLmNvbmNhdChyZXN1bHRzTm9kZSk7XG5cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfVxuXG4gIC8vIEhlaWdodCBpcyBkZWZpbmVkIGFzIHRoZSBudW1iZXIgb2YgZWRnZXMgaW4gbG9uZ2VzdCBwYXRoIGZyb20gYSBnaXZlbiBub2RlIHRvIGEgbGVhZiBub2RlXG4gIGhlaWdodCh2YWx1ZSkge1xuICAgIGlmICghaXNPa2F5KHZhbHVlKSkgcmV0dXJuIG51bGw7XG5cbiAgICByZXR1cm4gdGhpcy54aGVpZ2h0KHZhbHVlLCB0aGlzLnJvb3QpO1xuICB9XG5cbiAgeGhlaWdodCh2YWx1ZSwgdHJlZU5vZGUpIHtcbiAgICAvLyBoZXJlIHdlJ3JlIHN0aWxsIGxvb2tpbmcgZm9yIHRoZSBub2RlXG4gICAgc3dpdGNoICh0cmVlTm9kZS5jb21wYXJlVih2YWx1ZSkpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgLy8gd2UgaGF2ZSBmb3VuZCB0aGUgbm9kZSwgd2UgY2FuIHN0YXJ0IGNvdW50aW5nXG4gICAgICAgIHJldHVybiB0aGlzLmNhbGNIZWlnaHQodHJlZU5vZGUpO1xuICAgICAgY2FzZSAxOlxuICAgICAgICAvLyBvdXIgbm9kZSB2YWx1ZSBpcyBsZXNzIHRoYW4gdGhlIHRyZWVOb2RlIHdlJ3JlIGxvb2tpbmcgZm9yXG4gICAgICAgIHJldHVybiB0aGlzLnhoZWlnaHQodmFsdWUsIHRyZWVOb2RlLmxlZnRQYXRoKTtcbiAgICAgIGNhc2UgLTE6XG4gICAgICAgIC8vIG91ciBub2RlIHZhbHVlIGlzIGdyZWF0ZXIgdGhhbiB0aGUgdHJlZU5vZGUgd2UncmUgbG9va2luZyBmb3JcbiAgICAgICAgcmV0dXJuIHRoaXMueGhlaWdodCh2YWx1ZSwgdHJlZU5vZGUucmlnaHRQYXRoKTtcbiAgICB9XG4gIH1cblxuICBjYWxjSGVpZ2h0KG5vZGUpIHtcbiAgICBpZiAoIWlzT2theShub2RlKSkgcmV0dXJuIDA7XG5cbiAgICBsZXQgbGVmdEhlaWdodCA9IDA7XG4gICAgbGV0IHJpZ2h0SGVpZ2h0ID0gMDtcblxuICAgIGlmIChpc09rYXkobm9kZS5sZWZ0UGF0aCkpIHtcbiAgICAgIGxlZnRIZWlnaHQrKztcbiAgICAgIGxlZnRIZWlnaHQgKz0gdGhpcy5jYWxjSGVpZ2h0KG5vZGUubGVmdFBhdGgpO1xuICAgIH1cbiAgICBpZiAoaXNPa2F5KG5vZGUucmlnaHRQYXRoKSkge1xuICAgICAgcmlnaHRIZWlnaHQrKztcbiAgICAgIHJpZ2h0SGVpZ2h0ICs9IHRoaXMuY2FsY0hlaWdodChub2RlLnJpZ2h0UGF0aCk7XG4gICAgfVxuXG4gICAgaWYgKGxlZnRIZWlnaHQgPiByaWdodEhlaWdodCkgcmV0dXJuIGxlZnRIZWlnaHQ7XG4gICAgZWxzZSByZXR1cm4gcmlnaHRIZWlnaHQ7XG4gIH1cblxuICBkZXB0aCh2YWx1ZSkge1xuICAgIGlmICghaXNPa2F5KHZhbHVlKSkgcmV0dXJuIG51bGw7XG5cbiAgICByZXR1cm4gdGhpcy54ZGVwdGgodmFsdWUsIHRoaXMucm9vdCk7XG4gIH1cblxuICAvLyBEZXB0aCBpcyBkZWZpbmVkIGFzIHRoZSBudW1iZXIgb2YgZWRnZXMgaW4gcGF0aCBmcm9tIGEgZ2l2ZW4gbm9kZSB0byB0aGUgdHJlZeKAmXMgcm9vdCBub2RlLlxuICB4ZGVwdGgodmFsdWUsIG5vZGUpIHtcbiAgICBzd2l0Y2ggKG5vZGUuY29tcGFyZVYodmFsdWUpKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIC8vIGJhc2UgY2FzZSwgdGhpcyBpcyB0aGUgbm9kZSB3ZSdyZSBjYWxjdWxhdGluZyB0aGUgZGVwdGggZm9yXG4gICAgICAgIHJldHVybiAwO1xuICAgICAgY2FzZSAxOlxuICAgICAgICAvLyBXZSBnb3QgdG8gdHVybiBsZWZ0IHRvIGZpbmQgb3VyIG5vZGVcbiAgICAgICAgcmV0dXJuIHRoaXMueGRlcHRoKHZhbHVlLCBub2RlLmxlZnRQYXRoKSArIDE7XG4gICAgICBjYXNlIC0xOlxuICAgICAgICAvLyBXZSBnb3QgdG8gdHVybiByaWdodCB0byBmaW5kIG91ciBub2RlXG4gICAgICAgIHJldHVybiB0aGlzLnhkZXB0aCh2YWx1ZSwgbm9kZS5yaWdodFBhdGgpICsgMTtcbiAgICB9XG4gIH1cblxuICBpc0JhbGFuY2VkKCkge1xuICAgIGlmICghaXNPa2F5KHRoaXMucm9vdCkpIHJldHVybiBudWxsOyAvLyBubyBic3QgdG8gZXZhbHVhdGVcblxuICAgIHJldHVybiB0aGlzLnhpc0JhbGFuY2VkKHRoaXMucm9vdCk7XG4gIH1cblxuICB4aXNCYWxhbmNlZChub2RlKSB7XG4gICAgLy8gYmFzZSBjYXNlXG4gICAgaWYgKG5vZGUuaXNMZWFmKCkpIHtcbiAgICAgIHJldHVybiB0cnVlOyAvLyBhIGxlYWYgaXMgYmFsYW5jZWQgaW4gaXRzZWxmXG4gICAgfVxuXG4gICAgaWYgKGlzT2theShub2RlLmxlZnRQYXRoKSkge1xuICAgICAgaWYgKCF0aGlzLnhpc0JhbGFuY2VkKG5vZGUubGVmdFBhdGgpKSByZXR1cm4gZmFsc2U7IC8vIG5vIG5lZWQgdG8gY29udGludWVcbiAgICB9XG5cbiAgICBpZiAoaXNPa2F5KG5vZGUucmlnaHRQYXRoKSkge1xuICAgICAgaWYgKCF0aGlzLnhpc0JhbGFuY2VkKG5vZGUucmlnaHRQYXRoKSkgcmV0dXJuIGZhbHNlOyAvLyBubyBuZWVkIHRvIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgY29uc3QgbGVmdEhlaWdodCA9IHRoaXMuY2FsY0hlaWdodChub2RlLmxlZnRQYXRoKTtcbiAgICBjb25zdCByaWdodEhlaWdodCA9IHRoaXMuY2FsY0hlaWdodChub2RlLnJpZ2h0UGF0aCk7XG4gICAgY29uc3QgaGRpZmYgPSBNYXRoLmFicyhsZWZ0SGVpZ2h0IC0gcmlnaHRIZWlnaHQpO1xuXG4gICAgaWYgKGhkaWZmID4gMSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIGlmIHdlIGdvdCBoZXJlLCBldmVyeXRoaW5nIGlzIGJhbGFuY2VkIGFzIGFsbCB0aGluZ3Mgc2hvdWxkIGJlXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZWJhbGFuY2UoKSB7XG4gICAgLy8gZmlyc3Qgd2UgcmVjb3ZlciBhbiBhcnJheSBvZiBhbGwgdGhlIGFjdHVhbCB2YWx1ZXMgdGhlIHRyZWUgaGFzXG4gICAgLy8gdGhlbiB3ZSBidWlsZFRyZWUgYWdhaW5cbiAgICB0aGlzLnJhd0RhdGEgPSB0aGlzLmlub3JkZXIoKTtcbiAgICB0aGlzLmRhdGEgPSB0aGlzLm1lcmdlU29ydCh0aGlzLnJhd0RhdGEpO1xuICAgIHRoaXMucm9vdCA9IHRoaXMuYnVpbGRUcmVlKHRoaXMuZGF0YSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gb2RpblRlc3QoKSB7XG4gIC8qXG5DcmVhdGUgYSBiaW5hcnkgc2VhcmNoIHRyZWUgZnJvbSBhbiBhcnJheSBvZiByYW5kb20gbnVtYmVycy4gXG5Zb3UgY2FuIGNyZWF0ZSBhIGZ1bmN0aW9uIGlmIHlvdSB3YW50IHRoYXQgcmV0dXJucyBhbiBhcnJheSBvZiByYW5kb20gbnVtYmVycyBlYWNoIHRpbWUgeW91IGNhbGwgaXQuXG5Db25maXJtIHRoYXQgdGhlIHRyZWUgaXMgYmFsYW5jZWQgYnkgY2FsbGluZyBpc0JhbGFuY2VkXG5QcmludCBvdXQgYWxsIGVsZW1lbnRzIGluIGxldmVsLCBwcmUsIHBvc3QsIGFuZCBpbiBvcmRlclxuVW5iYWxhbmNlIHRoZSB0cmVlIGJ5IGFkZGluZyBzZXZlcmFsIG51bWJlcnMgPiAxMDBcbkNvbmZpcm0gdGhhdCB0aGUgdHJlZSBpcyB1bmJhbGFuY2VkIGJ5IGNhbGxpbmcgaXNCYWxhbmNlZFxuQmFsYW5jZSB0aGUgdHJlZSBieSBjYWxsaW5nIHJlYmFsYW5jZVxuQ29uZmlybSB0aGF0IHRoZSB0cmVlIGlzIGJhbGFuY2VkIGJ5IGNhbGxpbmcgaXNCYWxhbmNlZFxuUHJpbnQgb3V0IGFsbCBlbGVtZW50cyBpbiBsZXZlbCwgcHJlLCBwb3N0LCBhbmQgaW4gb3JkZXJcbiovXG4gIC8vIGNvbnN0IG9kaW5BcnJheSA9IFsxLCA3LCA0LCAyMywgOCwgOSwgNCwgMywgNSwgNywgOSwgNjcsIDYzNDUsIDMyNF07XG4gIGNvbnN0IG9kaW5BcnJheSA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMjA7IGkrKykge1xuICAgIG9kaW5BcnJheS5wdXNoKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkpO1xuICB9XG5cbiAgY29uc3Qgb2RpblRyZWUgPSBuZXcgVHJlZShvZGluQXJyYXkpO1xuICBjb25zb2xlLmxvZygnUmFuZG9tIG9kaW5UcmVlIGNyZWF0ZWQ6ICcpO1xuICBwcmV0dHlQcmludChvZGluVHJlZS5yb290KTtcbiAgY29uc29sZS5sb2coJ2lzIGl0IGJhbGFuY2VkPyAnICsgb2RpblRyZWUuaXNCYWxhbmNlZCgpKTtcblxuICBjb25zb2xlLmxvZygnVHJhdmVyc2luZyBpbiBsZXZlbE9yZGVyOiAnKTtcbiAgY29uc29sZS5sb2cob2RpblRyZWUubGV2ZWxPcmRlcigpLnRvU3RyaW5nKCkpO1xuXG4gIGNvbnNvbGUubG9nKCdUcmF2ZXJzaW5nIGluIGlub3JkZXI6ICcpO1xuICBjb25zb2xlLmxvZyhvZGluVHJlZS5pbm9yZGVyKCkudG9TdHJpbmcoKSk7XG5cbiAgY29uc29sZS5sb2coJ1RyYXZlcnNpbmcgaW4gcHJlb3JkZXI6ICcpO1xuICBjb25zb2xlLmxvZyhvZGluVHJlZS5wcmVvcmRlcigpLnRvU3RyaW5nKCkpO1xuXG4gIGNvbnNvbGUubG9nKCdUcmF2ZXJzaW5nIGluIHBvc3RvcmRlcjogJyk7XG4gIGNvbnNvbGUubG9nKG9kaW5UcmVlLnBvc3RvcmRlcigpLnRvU3RyaW5nKCkpO1xuXG4gIGNvbnNvbGUubG9nKCd3ZSBhcmUgZ29ubmEgdW5iYWxhbmNlIHRoaXMgdHJlZScpO1xuICBmb3IgKGxldCBpID0gMTAwOyBpIDwgMTIwOyBpKyspIG9kaW5UcmVlLmluc2VydChpKTtcblxuICBjb25zb2xlLmxvZygnbm93IHRoZSB0cmVlIGlzIGxpa2UgdGhpczogJyk7XG4gIHByZXR0eVByaW50KG9kaW5UcmVlLnJvb3QpO1xuICBjb25zb2xlLmxvZygnaXMgaXQgYmFsYW5jZWQ/ICcgKyBvZGluVHJlZS5pc0JhbGFuY2VkKCkpO1xuICBjb25zb2xlLmxvZygnbGV0cyByZWJhbGFuY2UgaXQnKTtcbiAgb2RpblRyZWUucmViYWxhbmNlKCk7XG4gIHByZXR0eVByaW50KG9kaW5UcmVlLnJvb3QpO1xuXG4gIGNvbnNvbGUubG9nKCdUcmF2ZXJzaW5nIGluIGxldmVsT3JkZXI6ICcpO1xuICBjb25zb2xlLmxvZyhvZGluVHJlZS5sZXZlbE9yZGVyKCkudG9TdHJpbmcoKSk7XG5cbiAgY29uc29sZS5sb2coJ1RyYXZlcnNpbmcgaW4gaW5vcmRlcjogJyk7XG4gIGNvbnNvbGUubG9nKG9kaW5UcmVlLmlub3JkZXIoKS50b1N0cmluZygpKTtcblxuICBjb25zb2xlLmxvZygnVHJhdmVyc2luZyBpbiBwcmVvcmRlcjogJyk7XG4gIGNvbnNvbGUubG9nKG9kaW5UcmVlLnByZW9yZGVyKCkudG9TdHJpbmcoKSk7XG5cbiAgY29uc29sZS5sb2coJ1RyYXZlcnNpbmcgaW4gcG9zdG9yZGVyOiAnKTtcbiAgY29uc29sZS5sb2cob2RpblRyZWUucG9zdG9yZGVyKCkudG9TdHJpbmcoKSk7XG59XG5cbmZ1bmN0aW9uIGlzT2theShhcmcpIHtcbiAgaWYgKGFyZyA9PSBudWxsKSByZXR1cm4gZmFsc2U7XG4gIGVsc2UgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHByZXR0eVByaW50KG5vZGUsIHByZWZpeCA9ICcnLCBpc0xlZnQgPSB0cnVlKSB7XG4gIGNvbnN0IHZhbHVlID0gaXNPa2F5KG5vZGUpID8gbm9kZS52YWx1ZSA6IG51bGw7XG5cbiAgaWYgKGlzT2theShub2RlLnJpZ2h0UGF0aCkpIHtcbiAgICBwcmV0dHlQcmludChub2RlLnJpZ2h0UGF0aCwgYCR7cHJlZml4fSR7aXNMZWZ0ID8gJ+KUgiAgICcgOiAnICAgICd9YCwgZmFsc2UpO1xuICB9XG5cbiAgY29uc29sZS5sb2coYCR7cHJlZml4fSR7aXNMZWZ0ID8gJ+KUlOKUgOKUgCAnIDogJ+KUjOKUgOKUgCAnfSR7dmFsdWV9YCk7XG4gIGlmIChpc09rYXkobm9kZS5sZWZ0UGF0aCkpIHtcbiAgICBwcmV0dHlQcmludChub2RlLmxlZnRQYXRoLCBgJHtwcmVmaXh9JHtpc0xlZnQgPyAnICAgICcgOiAn4pSCICAgJ31gLCB0cnVlKTtcbiAgfVxufVxuXG5leHBvcnQgeyBvZGluVGVzdCB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbi8vIGltcG9ydCB7IHRlc3RMaW5rZWRMaXN0IH0gZnJvbSAnLi9MaW5rZWRMaXN0LmpzJztcbmltcG9ydCB7IG9kaW5UZXN0IH0gZnJvbSAnLi9CU1QuanMnO1xuXG5vZGluVGVzdCgpO1xuIl0sIm5hbWVzIjpbIk5vZGUiLCJjb25zdHJ1Y3RvciIsInZhbHVlIiwibGVmdFBhdGgiLCJyaWdodFBhdGgiLCJ0b1N0cmluZyIsImlzT2theSIsImNvbXBhcmUiLCJub2RlIiwiY29tcGFyZVYiLCJhc3NpZ24iLCJpc0xlYWYiLCJUcmVlIiwicmF3RGF0YSIsImRhdGEiLCJtZXJnZVNvcnQiLCJyb290IiwiYnVpbGRUcmVlIiwibGlzdCIsImxlbmd0aCIsIm1pZGRsZSIsIk1hdGgiLCJmbG9vciIsImxlZnRMaXN0Iiwic2xpY2UiLCJyaWdodExpc3QiLCJsZWZ0Tm9kZSIsInJpZ2h0Tm9kZSIsInRoaXNOb2RlIiwibWVyZ2VTb3J0ZWRMaXN0Iiwic29ydGVkTGlzdCIsInB1c2giLCJzaGlmdCIsImNvbmNhdCIsIlNldCIsImxlZnRTb3J0ZWRMaXN0IiwicmlnaHRTb3J0ZWRMaXN0IiwiaW5zZXJ0IiwieGlzcnQiLCJuZXdOb2RlIiwibGVmdHRQYXRoIiwiZGVsZXRlIiwieGRlbGV0ZSIsImRlbGV0ZU5vZGUiLCJzbWFsbGVzdE5vZGUiLCJzZWFyY2hTbWFsbGVzdCIsImZpbmQiLCJ4ZmluZCIsImxldmVsT3JkZXIiLCJjYiIsInYiLCJmaXJzdFF1ZXVlIiwieGxldmVsT3JkZXIiLCJxdWV1ZSIsInJlc3VsdHMiLCJuZXh0UXVldWUiLCJmb3JFYWNoIiwiaW5vcmRlciIsInhpbm9yZGVyIiwicmVzdWx0c0xlZnQiLCJyZXN1bHRzTm9kZSIsInJlc3VsdHNSaWdodCIsInByZW9yZGVyIiwieHByZW9yZGVyIiwicG9zdG9yZGVyIiwieHBvc3RvcmRlciIsImhlaWdodCIsInhoZWlnaHQiLCJ0cmVlTm9kZSIsImNhbGNIZWlnaHQiLCJsZWZ0SGVpZ2h0IiwicmlnaHRIZWlnaHQiLCJkZXB0aCIsInhkZXB0aCIsImlzQmFsYW5jZWQiLCJ4aXNCYWxhbmNlZCIsImhkaWZmIiwiYWJzIiwicmViYWxhbmNlIiwib2RpblRlc3QiLCJvZGluQXJyYXkiLCJpIiwicmFuZG9tIiwib2RpblRyZWUiLCJjb25zb2xlIiwibG9nIiwicHJldHR5UHJpbnQiLCJhcmciLCJwcmVmaXgiLCJpc0xlZnQiXSwic291cmNlUm9vdCI6IiJ9