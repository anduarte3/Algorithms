// A BST allows fast operations for lookup, insertion, and deletion of data items.

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

function Node (value) {
    let node = { 
        value: value, 
        left: null, 
        right: null
    };

    return node;
}

function Tree(arr) {
    let root = null;
    
    const buildTree = () => {
        let start = 0;
        let end = arr.length-1;
        let mid = Math.round((start + end) / 2);

        // console.log("Start:", start);
        // console.log("End:", end);
        // console.log("Mid:", mid);
        
        root = Node(arr[mid]);        
        console.log(root);
        
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


const tree = Tree(arr);
console.log("Tree Node:", tree.buildTree());
console.log(prettyPrint(tree.buildTree()));