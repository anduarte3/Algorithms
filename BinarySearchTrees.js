import { mergeSort, merge } from "./mergeSort.js"
// A BST allows fast operations for lookup, insertion, and deletion of data items.

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

function Node (data, left, right) {
    let node = {
      data: data,
      left: left,
      right: right
    };

    return node;
}

function Tree() {
    let root = null;
    
    const buildTree = (arr) => {
      let mid = Math.floor(arr.length / 2);
      let finalArr = [];
      let leftArr = [];
      let rightArr = [];
      let sorted = null;
        
      const removeDupes = (arr) => {
        //Remove duplicates
        finalArr = arr.filter((e, index) => {
            return arr.indexOf(e) === index;
        })
        return finalArr;
      }

      finalArr = removeDupes(arr);
      // Run margeSort.js
      sorted = mergeSort(finalArr);
      
      if (sorted.length === 0) return null;

      if (sorted.length === 1) {
          root = Node(sorted[0], null, null)
          return root;
      }

      leftArr = sorted.slice(0, mid);
      rightArr = sorted.slice(mid + 1);   
      
      root = Node(sorted[mid], buildTree(leftArr), buildTree(rightArr));
      
      return root;
    }

    const insert = (value) => {
      root = insertRec(root, value);
    }

    const insertRec = (root, value) => {
      
      if (!root) {
        return new Node(value, null ,null);
      }

      // Duplicates not allowed
      if (root.data === value) {
        console.log("Duplicates not allowed");
        return root;
      }

      if (value < root.data) {
        //Recursively, go to the left 
        root.left = insertRec(root.left, value);
      } else {
        //Recursively, go to the right
        root.right = insertRec(root.right, value);
      }
      
      return root;
    }

    const deleteItem = (value) => {
      root = deleteItemRec(root, value);
    }

    const deleteItemRec = (root, value) => {
      let curr = null;

      if (!root) return root; 

      // Note, if the node to be deleted has right and left children go to the right, find the smallest and replace 
      // it with the smallest number found
      if (root.data > value) {
        root.left = deleteItemRec(root.left, value);
        return root;
      } else if (root.data < value) {
        root.right = deleteItemRec(root.right, value);
        return root;
      } else {
        // If value == root.data
        if (!root.left) return root.right;
        if (!root.right) return root.left;

        if (root.left === null) {
          console.log("Returning root.left", root.right);
          return root.right;
        }

        if (root.right === null) {
          console.log("Returning root.left", root.left);
          return root.left;
        }

        // Case if both childrens have nodes
        curr = root.right;

        while (curr.left) {
          curr = curr.left;
        }
        root.data = curr.data;
        root.right = deleteItemRec(root.right, root.data);

        return root;
      }
    }

    const find = (value) => {
      return findRec(root, value);
    }
    
    const findRec = (root, value) => {

      if (!root) { return `Value ${value} was not found.` }
      if (root.data == value) {
        return `Found value ${root.data}.`;
      }

      if (value < root.data) {
        // Go to the left
        return findRec(root.left, value);   
      }

      if (value > root.data) {
        // GO to the right
        return findRec(root.right, value);   
      }
    }

    const levelOrder = (callback) => {
      let queue = [];
      let curr = root;
      // Root node, then store left and right somewhere:
      if (!root) return null;

      if (!callback) throw Error("callback missing");

      queue.push(root);

      while (queue.length > 0) {
        curr = queue.shift();
        callback(curr);
        if (curr.left !== null) queue.push(curr.left);
        if (curr.right !== null) queue.push(curr.right);
      }
    }
    
    const preOrder = (callback) => {
      let curr = root;

      if (!callback) throw Error("callback missing");

      const preTraverse = (curr, callback) => {
        if (!curr) return null;

        callback(curr);
        preTraverse(curr.left, callback);
        preTraverse(curr.right, callback);
      }

      preTraverse(root, callback);
    }

    const inOrder = (callback) => {
      let curr = root;

      if (!callback) throw Error("callback missing");

      const inTraverse = (curr, callback) => {
        if (!curr) return null;

        inTraverse(curr.left, callback);
        callback(curr);
        inTraverse(curr.right, callback);
      }

      inTraverse(curr, callback);
    }

    const postOrder = (callback) => {
      let curr = root;

      if (!callback) throw Error("callback missing");

      const postTraverse = (curr, callback) => {
        if (!curr) return null;

        postTraverse(curr.left, callback);
        postTraverse(curr.right, callback);
        callback(curr);
      }

      postTraverse(curr, callback);
    }

    const height = (value) => {
      let curr = null;
      let height = 0;

      const heightRec = (root, value) => {

        if (!root) return "Not Found";

        if (value < root.data) {
          return heightRec(root.left, value);
        } else if (value > root.data) {
          return heightRec(root.right, value);
        } else {
          // Found value in root.data
          curr = root;
          return heightNode(curr);
        }
      }

      const heightNode = (curr) => {
        
        if (curr === null) return -1;

        let lHeight = heightNode(curr.left);
        let rHeight = heightNode(curr.right);

        height = Math.max(lHeight, rHeight) + 1;
        return height;
      }
      
      return heightRec(root, value);
    }

  return { root, buildTree, insert, deleteItem, find, levelOrder, preOrder, inOrder, postOrder, height }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

const tree = Tree();
const treeBuilt = tree.buildTree(arr);
//console.log(prettyPrint(treeBuilt));
tree.insert(123);
tree.insert(534);
tree.insert(14);
console.log("Added:", prettyPrint(treeBuilt));
tree.deleteItem(123);
tree.deleteItem(534);
tree.deleteItem(14);
console.log("Removed:", prettyPrint(treeBuilt));
console.log(tree.find(5));
console.log(tree.find(43));
console.log(tree.find(3));
console.log(tree.find(23));
console.log(tree.find(50));
//console.log(tree.levelOrder(callback));
//tree.levelOrder(node => console.log(node.data));
// tree.preOrder(node => console.log(node.data));
// tree.inOrder(node => console.log(node.data));
// tree.postOrder(node => console.log(node.data));
console.log(tree.height(6345)); // 0
console.log(tree.height(8)); // 1
console.log(tree.height(5)); // 2
console.log(tree.height(23)); // 3