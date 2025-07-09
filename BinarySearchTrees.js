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
      let sort = null;
        
      const removeDupes = (arr) => {
        //Remove duplicates
        finalArr = arr.filter((e, index) => {
            return arr.indexOf(e) === index;
        })
        return finalArr;
      }

      finalArr = removeDupes(arr);
      // Run margeSort.js
      sort = mergeSort(arr);
      
      if (finalArr.length === 0) return null;

      if (finalArr.length === 1) {
          root = Node(finalArr[0], null, null)
          return root;
      }

      leftArr = finalArr.slice(0, mid);
      rightArr = finalArr.slice(mid + 1);   
      
      root = Node(finalArr[mid], buildTree(leftArr), buildTree(rightArr));
      
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
      // it with the smallest number found, 
      // So after root.data === value, go to the right, then go to the left until its null you will find the smallest
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

  return { root, buildTree, insert, deleteItem }
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
