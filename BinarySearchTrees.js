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

      // Traverse BST in search to place value
      // Note: if value greater than root.data go to right, else go to left
      if (value < root.data) {
        //Recursively, go to the left 
        root.left = insertRec(root.left, value);
      } else {
        //Recursively, go to the right
        root.right = insertRec(root.right, value);
      }
      
      return root;
    }

  return { root, buildTree, insert }
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
console.log(prettyPrint(treeBuilt));
tree.insert(2);
tree.insert(123);
tree.insert(534);
tree.insert(14);
tree.insert(5);
console.log(prettyPrint(treeBuilt));

// tree.root = tree.insert(tree.root, 2);
// tree.root = tree.insert(tree.root, 78);
// tree.root = tree.insert(tree.root, 5);
// tree.root = tree.insert(tree.root, 44);
// tree.root = tree.insert(tree.root, 36);
// tree.root = tree.insert(tree.root, 22);
