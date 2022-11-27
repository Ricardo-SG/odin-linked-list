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
/* harmony export */   "testBST": () => (/* binding */ testBST)
/* harmony export */ });


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
    this.root = this.dlt(value, this.root);
  }
  dlt(value, node) {
    if (!isOkay(node)) return null; // base case, we have not found the node to delete

    switch (node.compareV(value)) {
      case 0:
        // we found the node to delete
        return this.deleteNode(node);
      case 1:
        // the node.Value is bigger than the value we're looking for. Therefore, left.
        node.leftPath = this.dlt(value, node.leftPath);
        return node;
      case -1:
        // the node.Value is smaller than the value we're looking for. Therefore, right.
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

(0,_BST_js__WEBPACK_IMPORTED_MODULE_0__.testBST)();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE1BQU1wRCxLQUFLLEdBQUdJLE1BQU0sQ0FBQ0UsSUFBSSxDQUFDLEdBQUdBLElBQUksQ0FBQ04sS0FBSyxHQUFHLElBQUk7RUFFOUMsSUFBSUksTUFBTSxDQUFDRSxJQUFJLENBQUNKLFNBQVMsQ0FBQyxFQUFFO0lBQzFCOEMsV0FBVyxDQUFDMUMsSUFBSSxDQUFDSixTQUFTLEVBQUcsR0FBRWlELE1BQU8sR0FBRUMsTUFBTSxHQUFHLE1BQU0sR0FBRyxNQUFPLEVBQUMsRUFBRSxLQUFLLENBQUM7RUFDNUU7RUFFQU4sT0FBTyxDQUFDQyxHQUFHLENBQUUsR0FBRUksTUFBTyxHQUFFQyxNQUFNLEdBQUcsTUFBTSxHQUFHLE1BQU8sR0FBRXBELEtBQU0sRUFBQyxDQUFDO0VBQzNELElBQUlJLE1BQU0sQ0FBQ0UsSUFBSSxDQUFDTCxRQUFRLENBQUMsRUFBRTtJQUN6QitDLFdBQVcsQ0FBQzFDLElBQUksQ0FBQ0wsUUFBUSxFQUFHLEdBQUVrRCxNQUFPLEdBQUVDLE1BQU0sR0FBRyxNQUFNLEdBQUcsTUFBTyxFQUFDLEVBQUUsSUFBSSxDQUFDO0VBQzFFO0FBQ0Y7Ozs7Ozs7VUMvT0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05hOztBQUViO0FBQ21DO0FBRW5DVCxnREFBTyxFQUFFLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLWxpbmtlZC1saXN0Ly4vc3JjL0JTVC5qcyIsIndlYnBhY2s6Ly9vZGluLWxpbmtlZC1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4tbGlua2VkLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4tbGlua2VkLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLWxpbmtlZC1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2Rpbi1saW5rZWQtbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qIGVzbGludC1kaXNhYmxlICovXG5cbmNsYXNzIE5vZGUge1xuICBjb25zdHJ1Y3Rvcih2YWx1ZSwgbGVmdFBhdGgsIHJpZ2h0UGF0aCkge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLmxlZnRQYXRoID0gbGVmdFBhdGg7XG4gICAgdGhpcy5yaWdodFBhdGggPSByaWdodFBhdGg7XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICBpZiAoaXNPa2F5KHRoaXMpKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgY29tcGFyZShub2RlKSB7XG4gICAgaWYgKHRoaXMudmFsdWUgPT09IG5vZGUudmFsdWUpIHJldHVybiAwO1xuICAgIGlmICh0aGlzLnZhbHVlID4gbm9kZS52YWx1ZSkgcmV0dXJuIDE7XG4gICAgaWYgKHRoaXMudmFsdWUgPCBub2RlLnZhbHVlKSByZXR1cm4gLTE7XG4gIH1cbiAgY29tcGFyZVYodmFsdWUpIHtcbiAgICBpZiAodGhpcy52YWx1ZSA9PT0gdmFsdWUpIHJldHVybiAwO1xuICAgIGlmICh0aGlzLnZhbHVlID4gdmFsdWUpIHJldHVybiAxO1xuICAgIGlmICh0aGlzLnZhbHVlIDwgdmFsdWUpIHJldHVybiAtMTtcbiAgfVxuXG4gIGFzc2lnbihub2RlKSB7XG4gICAgdGhpcy52YWx1ZSA9IG5vZGUudmFsdWU7XG4gICAgdGhpcy5sZWZ0UGF0aCA9IG5vZGUubGVmdFBhdGg7XG4gICAgdGhpcy5yaWdodFBhdGggPSBub2RlLnJpZ2h0UGF0aDtcbiAgfVxufVxuXG5jbGFzcyBUcmVlIHtcbiAgY29uc3RydWN0b3IocmF3RGF0YSkge1xuICAgIHRoaXMucmF3RGF0YSA9IHJhd0RhdGE7IC8vIGJlY2F1c2UgSSBkb24ndCBsaWtlIGxvc2luZyBkYXRhLlxuICAgIHRoaXMuZGF0YSA9IHRoaXMubWVyZ2VTb3J0KHJhd0RhdGEpO1xuICAgIHRoaXMucm9vdCA9IHRoaXMuYnVpbGRUcmVlKHRoaXMuZGF0YSk7XG4gIH1cblxuICBidWlsZFRyZWUobGlzdCkge1xuICAgIC8vIGlmIHRoZSBhcmd1bWVudCBpcyBhIG51bGwgb3IgdW5kZWZpbmVkIG5vdGhpbmcgdG8gZG8gaGVyZVxuICAgIGlmIChpc09rYXkobGlzdCkgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyAxKSBiYXNlIGNhc2U6IGlmIG51bWJlciBvZiBlbGVtZW50cyBpbiBhcnJheSBpcyAxLCB3ZSByZXR1cm4gdGhhdCBub2RlLlxuICAgIGlmIChsaXN0Lmxlbmd0aCA8PSAxKSB7XG4gICAgICByZXR1cm4gbmV3IE5vZGUobGlzdFswXSwgbnVsbCwgbnVsbCk7XG4gICAgfVxuXG4gICAgLy8gMikgZm9yIG1vcmUgdGhhbiAxIGVsZW1lbnQgYXJyYXlzLCB3ZSBkaXZpZGUgaXQgaW4gdHdvLCBsZWZ0IGFuZCByaWdodCwgYW5kIGNhbGwgcmVjdXJzaXZlbHkgdG8gdHJlYXQgdGhlbVxuICAgIGNvbnN0IG1pZGRsZSA9IE1hdGguZmxvb3IobGlzdC5sZW5ndGggLyAyKTtcbiAgICBjb25zdCBsZWZ0TGlzdCA9IGxpc3Quc2xpY2UoMCwgbWlkZGxlKTtcbiAgICBjb25zdCByaWdodExpc3QgPSBsaXN0LnNsaWNlKG1pZGRsZSArIDEsIGxpc3QubGVuZ3RoKTtcblxuICAgIGNvbnN0IGxlZnROb2RlID0gaXNPa2F5KGxlZnRMaXN0KSA/IHRoaXMuYnVpbGRUcmVlKGxlZnRMaXN0KSA6IG51bGw7XG4gICAgY29uc3QgcmlnaHROb2RlID0gaXNPa2F5KHJpZ2h0TGlzdCkgPyB0aGlzLmJ1aWxkVHJlZShyaWdodExpc3QpIDogbnVsbDtcbiAgICBjb25zdCB0aGlzTm9kZSA9IG5ldyBOb2RlKGxpc3RbbWlkZGxlXSwgbGVmdE5vZGUsIHJpZ2h0Tm9kZSk7XG5cbiAgICByZXR1cm4gdGhpc05vZGU7XG4gIH1cbiAgLy8gVGhlIGNvZGUgaGF2ZSBiZWVuIGNvcGllZCBhbmQgYWRhcHRlZCBmcm9tIGh0dHBzOi8vbWVkaXVtLmNvbS9AbWFuaXNoc3VuZHJpeWFsL21lcmdlLXNvcnQtaW4tamF2YXNjcmlwdC05YWU0ODg5N2M1ZTlcbiAgLy8gSSBhbHJlYWR5IGtuZXcgdG9wLWRvd24gbWVyZ2UgYWxnb3JpdGhtIHRoYW5rcyB0byBUaGUgT2RpbiBQcm9qZWN0LlxuICBtZXJnZVNvcnQocmF3RGF0YSkge1xuICAgIGNvbnN0IG1lcmdlU29ydGVkTGlzdCA9IGZ1bmN0aW9uIChsZWZ0TGlzdCwgcmlnaHRMaXN0KSB7XG4gICAgICBsZXQgc29ydGVkTGlzdCA9IFtdO1xuICAgICAgLy8gY3JlYXRlIHNvcnRlZCBhcnJheSB3aXRoIGxlZnQgYW5kIHJpZ2h0IHN1Ymxpc3RcbiAgICAgIHdoaWxlIChsZWZ0TGlzdC5sZW5ndGggJiYgcmlnaHRMaXN0Lmxlbmd0aCkge1xuICAgICAgICBpZiAobGVmdExpc3RbMF0gPD0gcmlnaHRMaXN0WzBdKSB7XG4gICAgICAgICAgc29ydGVkTGlzdC5wdXNoKGxlZnRMaXN0LnNoaWZ0KCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNvcnRlZExpc3QucHVzaChyaWdodExpc3Quc2hpZnQoKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIGFkZCB0aGUgcmVtYWluaW5nIGVsZW1lbnRzLCBpZiBhbnlcbiAgICAgIGlmIChsZWZ0TGlzdC5sZW5ndGgpIHtcbiAgICAgICAgc29ydGVkTGlzdCA9IHNvcnRlZExpc3QuY29uY2F0KGxlZnRMaXN0KTtcbiAgICAgIH1cbiAgICAgIGlmIChyaWdodExpc3QubGVuZ3RoKSB7XG4gICAgICAgIHNvcnRlZExpc3QgPSBzb3J0ZWRMaXN0LmNvbmNhdChyaWdodExpc3QpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNvcnRlZExpc3Q7XG4gICAgfTtcblxuICAgIGNvbnN0IGxpc3QgPSBbLi4ubmV3IFNldChyYXdEYXRhKV07XG5cbiAgICAvLyBiYXNlIGNhc2VcbiAgICBpZiAobGlzdC5sZW5ndGggPD0gMSkge1xuICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgfVxuXG4gICAgY29uc3QgbWlkZGxlID0gTWF0aC5mbG9vcihsaXN0Lmxlbmd0aCAvIDIpO1xuICAgIGNvbnN0IGxlZnRMaXN0ID0gbGlzdC5zbGljZSgwLCBtaWRkbGUpO1xuICAgIGNvbnN0IHJpZ2h0TGlzdCA9IGxpc3Quc2xpY2UobWlkZGxlLCBsaXN0Lmxlbmd0aCk7XG4gICAgY29uc3QgbGVmdFNvcnRlZExpc3QgPSB0aGlzLm1lcmdlU29ydChsZWZ0TGlzdCk7IC8vIGxlZnQgc3VibGlzdFxuICAgIGNvbnN0IHJpZ2h0U29ydGVkTGlzdCA9IHRoaXMubWVyZ2VTb3J0KHJpZ2h0TGlzdCk7IC8vIHJpZ2h0IHN1Ymxpc3RcblxuICAgIHJldHVybiBtZXJnZVNvcnRlZExpc3QobGVmdFNvcnRlZExpc3QsIHJpZ2h0U29ydGVkTGlzdCk7XG4gIH1cblxuICBpbnNlcnQodmFsdWUpIHtcbiAgICAvLyBjYXBzdWxlIGluc2VydCBmdW5jdGlvblxuICAgIGlmICghaXNPa2F5KHZhbHVlKSkgcmV0dXJuOyAvLyBndWFyZCBjbGF1c2VcblxuICAgIHRoaXMuaXNydChuZXcgTm9kZSh2YWx1ZSwgbnVsbCwgbnVsbCksIHRoaXMucm9vdCk7XG4gIH1cblxuICBpc3J0KG5ld05vZGUsIG5vZGUpIHtcbiAgICAvLyB0cnVlIGluc2VydCBmdW5jdGlvblxuICAgIGlmICghaXNPa2F5KG5ld05vZGUpKSByZXR1cm47IC8vIGd1YXJkIGNsYXVzZVxuXG4gICAgaWYgKG5vZGUgPT09IG51bGwpIHtcbiAgICAgIC8vIEJhc2UgY2FzZVxuICAgICAgbm9kZSA9IG5ld05vZGU7XG4gICAgICByZXR1cm47IC8vIGFuZCB3ZSdyZSBkb25lLlxuICAgIH0gZWxzZSB7XG4gICAgICBzd2l0Y2ggKG5ld05vZGUuY29tcGFyZShub2RlKSkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgLy8gVGhlIHNhbWUgdmFsdWVcbiAgICAgICAgICAvLyBXZSBkbyBub3QgaW5zZXJ0IGR1cGxpY2F0ZWQgdmFsdWVzXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgLy8gbmV3Tm9kZSBpcyBiaWdnZXIgdGhhbiB0aGUgYWN0dWFsIG5vZGVcbiAgICAgICAgICBpZiAoIWlzT2theShub2RlLnJpZ2h0UGF0aCkpIHtcbiAgICAgICAgICAgIG5vZGUucmlnaHRQYXRoID0gbmV3Tm9kZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pc3J0KG5ld05vZGUsIG5vZGUucmlnaHRQYXRoKTsgLy8gdGhlIHNlYXJjaCBjb250aW51ZXNcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNhc2UgLTE6XG4gICAgICAgICAgLy8gbmV3Tm9kZSBpcyBiaWdnZXIgdGhhbiB0aGUgYWN0dWFsIG5vZGVcbiAgICAgICAgICBpZiAoIWlzT2theShub2RlLmxlZnRQYXRoKSkge1xuICAgICAgICAgICAgbm9kZS5sZWZ0dFBhdGggPSBuZXdOb2RlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmlzcnQobmV3Tm9kZSwgbm9kZS5sZWZ0UGF0aCk7IC8vIHRoZSBzZWFyY2ggY29udGludWVzXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgZGVmYXVsdDogLy8gd2UgbmV2ZXIgZ2V0IGhlcmVcbiAgICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZGVsZXRlKHZhbHVlKSB7XG4gICAgaWYgKCFpc09rYXkodmFsdWUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5yb290ID0gdGhpcy5kbHQodmFsdWUsIHRoaXMucm9vdCk7XG4gIH1cblxuICBkbHQodmFsdWUsIG5vZGUpIHtcbiAgICBpZiAoIWlzT2theShub2RlKSkgcmV0dXJuIG51bGw7IC8vIGJhc2UgY2FzZSwgd2UgaGF2ZSBub3QgZm91bmQgdGhlIG5vZGUgdG8gZGVsZXRlXG5cbiAgICBzd2l0Y2ggKG5vZGUuY29tcGFyZVYodmFsdWUpKSB7XG4gICAgICBjYXNlIDA6IC8vIHdlIGZvdW5kIHRoZSBub2RlIHRvIGRlbGV0ZVxuICAgICAgICByZXR1cm4gdGhpcy5kZWxldGVOb2RlKG5vZGUpO1xuICAgICAgY2FzZSAxOiAvLyB0aGUgbm9kZS5WYWx1ZSBpcyBiaWdnZXIgdGhhbiB0aGUgdmFsdWUgd2UncmUgbG9va2luZyBmb3IuIFRoZXJlZm9yZSwgbGVmdC5cbiAgICAgICAgbm9kZS5sZWZ0UGF0aCA9IHRoaXMuZGx0KHZhbHVlLCBub2RlLmxlZnRQYXRoKTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICBjYXNlIC0xOiAvLyB0aGUgbm9kZS5WYWx1ZSBpcyBzbWFsbGVyIHRoYW4gdGhlIHZhbHVlIHdlJ3JlIGxvb2tpbmcgZm9yLiBUaGVyZWZvcmUsIHJpZ2h0LlxuICAgICAgICBub2RlLnJpZ2h0UGF0aCA9IHRoaXMuZGx0KHZhbHVlLCBub2RlLnJpZ2h0UGF0aCk7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbiAgfVxuXG4gIGRlbGV0ZU5vZGUobm9kZSkge1xuICAgIC8vIGNhc2U6IHRoZSBOb2RlIGhhcyBib3RoIHBhdGhzXG4gICAgaWYgKGlzT2theShub2RlLnJpZ2h0UGF0aCkgJiYgaXNPa2F5KG5vZGUubGVmdFBhdGgpKSB7XG4gICAgICBjb25zdCBzbWFsbGVzdE5vZGUgPSB0aGlzLnNlYXJjaFNtYWxsZXN0KG5vZGUucmlnaHRQYXRoKTsgLy8gd2UgZ2V0IHRoZSBzbWFsbGVzdCBub2RlIGluIHRoZSByaWdodCBwYXRoXG4gICAgICBub2RlLnZhbHVlID0gc21hbGxlc3ROb2RlLnZhbHVlOyAvLyBXZSBzd2FwIHRoZSB2YWx1ZXNcbiAgICAgIG5vZGUucmlnaHRQYXRoID0gdGhpcy5kbHQobm9kZS52YWx1ZSwgbm9kZS5yaWdodFBhdGgpOyAvLyB3ZSBjb21tYW5kIGl0IHRvIGRlbGV0ZSB0aGUgc21hbGxlc3Qgbm9kZVxuICAgICAgcmV0dXJuIG5vZGU7IC8vIHdlIHJldHVybiB0aGUgbm9kZVxuICAgIH1cblxuICAgIC8vIGNhc2U6IE5vZGUgb25seSBoYXMgcmlnaHQgcGF0aFxuICAgIGlmIChpc09rYXkobm9kZS5yaWdodFBhdGgpKSB7XG4gICAgICByZXR1cm4gbm9kZS5yaWdodFBhdGg7XG4gICAgfVxuXG4gICAgLy8gQ2FzZTogTm9kZSBvbmx5IGhhcyBsZWZ0IHBhdGhcbiAgICBpZiAoaXNPa2F5KG5vZGUubGVmdFBhdGgpKSB7XG4gICAgICByZXR1cm4gbm9kZS5sZWZ0UGF0aDtcbiAgICB9XG5cbiAgICAvLyBDYXNlOiBOb2RlIGRvZXNuJ3QgaGF2ZSBsZWZ0IG5vciByaWdodCBwYXRoXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBzZWFyY2hTbWFsbGVzdChub2RlKSB7XG4gICAgLy8gd2UgZ29ubmEgZ28gdGhyb3VnaHQgbGVmdCBwYXRocyB1bnRpbCBudWxsLlxuICAgIGlmICghaXNPa2F5KG5vZGUubGVmdFBhdGgpKSB7XG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoU21hbGxlc3Qobm9kZS5sZWZ0UGF0aCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHRlc3RCU1QoKSB7XG4gIGNvbnN0IG9kaW5BcnJheSA9IFsxLCA3LCA0LCAyMywgOCwgOSwgNCwgMywgNSwgNywgOSwgNjcsIDYzNDUsIDMyNF07XG4gIC8vY29uc3Qgb2RpbkFycmF5ID0gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTIsIDEzLCAxNCwgMTVdO1xuICBjb25zdCBvZGluVHJlZSA9IG5ldyBUcmVlKG9kaW5BcnJheSk7XG4gIGNvbnNvbGUubG9nKCdSb290OiAnICsgb2RpblRyZWUucm9vdCk7XG4gIGNvbnNvbGUubG9nKCdvZGluVHJlZSAgICAgICAtLT4gJyArIG9kaW5UcmVlLmRhdGEpO1xuICBwcmV0dHlQcmludChvZGluVHJlZS5yb290KTtcbiAgY29uc29sZS5sb2coJ3dlIGluc2VydCAxMCcpO1xuICBvZGluVHJlZS5pbnNlcnQoMTAsIG9kaW5UcmVlLnJvb3QpO1xuICBwcmV0dHlQcmludChvZGluVHJlZS5yb290KTtcbiAgY29uc29sZS5sb2coJ3dlIGRlbGV0ZSA2NycpO1xuICBvZGluVHJlZS5kZWxldGUoNjcpO1xuICBwcmV0dHlQcmludChvZGluVHJlZS5yb290KTtcbn1cblxuZnVuY3Rpb24gaXNPa2F5KGFyZykge1xuICBpZiAoYXJnICE9PSBudWxsICYmIGFyZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIHByZXR0eVByaW50KG5vZGUsIHByZWZpeCA9ICcnLCBpc0xlZnQgPSB0cnVlKSB7XG4gIGNvbnN0IHZhbHVlID0gaXNPa2F5KG5vZGUpID8gbm9kZS52YWx1ZSA6IG51bGw7XG5cbiAgaWYgKGlzT2theShub2RlLnJpZ2h0UGF0aCkpIHtcbiAgICBwcmV0dHlQcmludChub2RlLnJpZ2h0UGF0aCwgYCR7cHJlZml4fSR7aXNMZWZ0ID8gJ+KUgiAgICcgOiAnICAgICd9YCwgZmFsc2UpO1xuICB9XG5cbiAgY29uc29sZS5sb2coYCR7cHJlZml4fSR7aXNMZWZ0ID8gJ+KUlOKUgOKUgCAnIDogJ+KUjOKUgOKUgCAnfSR7dmFsdWV9YCk7XG4gIGlmIChpc09rYXkobm9kZS5sZWZ0UGF0aCkpIHtcbiAgICBwcmV0dHlQcmludChub2RlLmxlZnRQYXRoLCBgJHtwcmVmaXh9JHtpc0xlZnQgPyAnICAgICcgOiAn4pSCICAgJ31gLCB0cnVlKTtcbiAgfVxufVxuXG5leHBvcnQgeyB0ZXN0QlNUIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIid1c2Ugc3RyaWN0JztcblxuLy8gaW1wb3J0IHsgdGVzdExpbmtlZExpc3QgfSBmcm9tICcuL0xpbmtlZExpc3QuanMnO1xuaW1wb3J0IHsgdGVzdEJTVCB9IGZyb20gJy4vQlNULmpzJztcblxudGVzdEJTVCgpO1xuIl0sIm5hbWVzIjpbIk5vZGUiLCJjb25zdHJ1Y3RvciIsInZhbHVlIiwibGVmdFBhdGgiLCJyaWdodFBhdGgiLCJ0b1N0cmluZyIsImlzT2theSIsImNvbXBhcmUiLCJub2RlIiwiY29tcGFyZVYiLCJhc3NpZ24iLCJUcmVlIiwicmF3RGF0YSIsImRhdGEiLCJtZXJnZVNvcnQiLCJyb290IiwiYnVpbGRUcmVlIiwibGlzdCIsImxlbmd0aCIsIm1pZGRsZSIsIk1hdGgiLCJmbG9vciIsImxlZnRMaXN0Iiwic2xpY2UiLCJyaWdodExpc3QiLCJsZWZ0Tm9kZSIsInJpZ2h0Tm9kZSIsInRoaXNOb2RlIiwibWVyZ2VTb3J0ZWRMaXN0Iiwic29ydGVkTGlzdCIsInB1c2giLCJzaGlmdCIsImNvbmNhdCIsIlNldCIsImxlZnRTb3J0ZWRMaXN0IiwicmlnaHRTb3J0ZWRMaXN0IiwiaW5zZXJ0IiwiaXNydCIsIm5ld05vZGUiLCJsZWZ0dFBhdGgiLCJkZWxldGUiLCJkbHQiLCJkZWxldGVOb2RlIiwic21hbGxlc3ROb2RlIiwic2VhcmNoU21hbGxlc3QiLCJ0ZXN0QlNUIiwib2RpbkFycmF5Iiwib2RpblRyZWUiLCJjb25zb2xlIiwibG9nIiwicHJldHR5UHJpbnQiLCJhcmciLCJ1bmRlZmluZWQiLCJwcmVmaXgiLCJpc0xlZnQiXSwic291cmNlUm9vdCI6IiJ9