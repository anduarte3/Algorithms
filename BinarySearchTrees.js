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
            return finalArr
        }

        // Run margeSort.js
        sort = mergeSort(arr);
        finalArr = removeDupes(arr);
        
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

    return { root, buildTree }
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
// console.log("Tree Node:", tree.buildTree(arr));
console.log(prettyPrint(tree.buildTree(arr)));