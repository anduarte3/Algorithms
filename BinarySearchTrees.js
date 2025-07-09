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

    const depth = (value) => {
      let curr = root;
      let depth = 0;

      const depthRec = (root, value) => {
        if (root === null) return -1;

        if (value < root.data) {
          depth++;
          return depthRec(root.left, value);
        } else if (value > root.data) {
          depth++;
          return depthRec(root.right, value);
        } else {
          // Found value in root.data
          return depth;
        }

      }

      return depthRec(root, value);
    }

    const isBalanced = (root) => {

      if (root === null) return true;

      const height = (node) => {

        if (node === null) return -1;

        let lHeight = height(node.left);
        let rHeight = height(node.right);

        return Math.max(lHeight, rHeight) + 1;
      }

      let lHeight = height(root.left);
      let rHeight = height(root.right);

      if (Math.abs(lHeight - rHeight) > 1) return false;

      return isBalanced(root.left) && isBalanced(root.right);
    }

    const rebalance = () => {
      let sortedArr = [];

      inOrder(node => sortedArr.push(node.data));
      root = buildTree(sortedArr);

      return root;
    }

  return { 
    root, 
    buildTree, 
    insert, 
    deleteItem, 
    find, 
    levelOrder, 
    preOrder, 
    inOrder, 
    postOrder, 
    height, 
    depth,
    isBalanced,
    rebalance
  }
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

////////////////////////// DRIVER SCRIPT //////////////////////////

// 1. Generate random array of numbers less than 100
function createArr (size) {
  let arr = [];

  for (let i=0; i<size; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }
  console.log(arr);
  return arr;
}
// 2. Build your BST with that array
const randomArr = createArr(20);          
const tree = new Tree();                    
const root = tree.buildTree(randomArr);  
prettyPrint(root);
console.log(prettyPrint(root));

// 3.1 In Order tree traversal
console.log("InOrder traversal:");
tree.inOrder(node => console.log(node.data));
console.log("//////////////////////////");

// 3.2 Pre Order tree traversal
console.log("PreOrder traversal:");
tree.preOrder(node => console.log(node.data));
console.log("//////////////////////////");

// 3.3 Post Order tree traversal
console.log("PostOrder traversal:");
tree.postOrder(node => console.log(node.data));
console.log("//////////////////////////");

// 4. Check if tree is balanced
console.log("Is tree balanced?", tree.isBalanced(tree.root));

// 5. If not balanced, rebalance it
if (!tree.isBalanced(tree.root)) {
  tree.rebalance();
  console.log("Tree rebalanced.");
  console.log("InOrder traversal after rebalancing:");
  tree.inOrder(node => console.log(node.data));
}

// 6. Test height and depth functions
console.log("Height of node 15:", tree.height(15));
console.log("Depth of node 15:", tree.depth(15));

////////////////////////// DRIVER SCRIPT //////////////////////////