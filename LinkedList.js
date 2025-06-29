// The principal benefit of a linked list over a conventional array is that the list elements can easily be inserted or removed without reallocation of any other elements.
// In some programming languages, the size of an array is a concern and one of the ways to overcome that problem and allow dynamically allocated data is using linked lists.

// A linked list is a linear collection of data elements called nodes that “point” to the next node by means of a pointer.

// Each node holds a single element of data and a link or pointer to the next node in the list.

// A head node is the first node in the list, a tail node is the last node in the list. Below is a basic representation of a linked list:

// [ NODE(head) ] -> [ NODE ] -> [ NODE(tail) ] -> null

function Node(data) {
    let value = data;
    let nextNode = null;

    return { value, nextNode }
}

function LinkedList() {
    let head = null;
    let current = null;
    let count = 0;

    const append = (value) => {

        if (head == null) {
            head = Node(value);
        } else {
            if (current != null) {
                current.nextNode = Node(value);
                current = current.nextNode;
            } else {
                current = Node(value);
                head.nextNode = current;
            }  
        }  
        count++;
    }

    const prepend = (value) => {
        let prep = null;

        if (head == null) {
            head = Node(value)
        } else {
            prep = Node(value);
            prep.nextNode = head;
            head = prep;
        }
        count++;
    }

    const size = () => {
        return `Total number of Nodes is: ${count}.`;
    }

    const getHead = () => {
        return `The first node in the list is: ${head.value}.`
    }

    const getTail = () => {
        let node = head;

        while (node.nextNode !== null) {
            node = node.nextNode;
        }
        return `The last node in the list is: ${node.value}.`
    }
    
    const At = (index) => {
        let i = 0;
        let curr = head;

        while (curr !== null) {
            if (index == i) {
                return `The node at index ${index} is: ${curr.value}.`;
            } 
            curr = curr.nextNode;
            i++;
        }
        return `No node found at index ${index}.`
    } 

    const pop = () => {
        let curr = head;
        let prev;
        let removed;

        while (curr.nextNode !== null) {
            prev = curr; 
            curr = curr.nextNode;
        }

        if (head == null) return "List is empty";

        if (head.nextNode == null) {
            head = null;
            return `Removed the solo node ${head}. List is now empty.`;
        }
        removed = prev.nextNode;
        prev.nextNode = null;
        
        return `Removed node ${removed.value}! The last node is now: ${prev.value}.`;
    }

    const contains = (value) => {
        let curr = head;
        
        while (curr !== null) {
            if (curr.value == value) return true;
            curr = curr.nextNode;
        }
        return false;
    }

    const find = (value) => {
        let index = 0;
        let curr = head;
        
        while (curr !== null) {
            if (curr.value == value) {
                return `The index of ${value} is ${index}`;
            }    
            curr = curr.nextNode;
            index++;
        }
        return false;
    }

    const toString = () => {
        let result = `( ${head.value} ) -> `;
        let curr = head.nextNode;

        if (head.nextNode == null) return result;
        
        while (curr.nextNode !== null) {
            result += `( ${curr.value} ) -> `;
            curr = curr.nextNode;
        }
        result += `( ${curr.value}`;
        return `${result} ) -> null`;
    }

    ////////////////////////////////////// EXTRA CREDIT //////////////////////////////////////
    const insertAt = (value, index) => {
        let i = 0;
        let curr = head.nextNode;
        let prev = head;
        let past;
        
        if (index === 0) {
            past = Node(value);
            past.nextNode = head;
            head = past;

            return `Node ${value} inserted at index ${index}.`
        }

        while (curr !== null) {
            if (i == index) {
                prev.nextNode = Node(value);
                prev.nextNode.nextNode = curr;
                return `Node ${value} inserted at index ${index}.`
            }
            prev = curr;
            curr = curr.nextNode;
            i++;
        }
        return `Could not insert the node ${value}, index at ${index}.`
    }

    const removeAt = (index) => {
        let i = 0;
        let curr = head;
        let prev = head;
        
        if (index === 0) {
            head = head.nextNode;
            return `Node ${prev.value} removed at index ${index}.`
        }

        while (curr !== null) {
            if (i === index) {
                prev.nextNode = curr.nextNode;
                return `Node removed ${curr.value} at index ${index}.`
            }
            prev = curr;
            curr = curr.nextNode;            
            i++;
        }
        return `Could not remove the node, index at ${index}.`
    }
    
    return { append, 
        prepend, 
        size, 
        getHead, 
        getTail, 
        At, 
        pop, 
        contains, 
        find, 
        insertAt, 
        removeAt, 
        toString 
    }
}

const list = new LinkedList();

console.log(list.size()) // 0

list.append("Dog");
list.append("Cat");
list.append("Parrot");
list.append("Hamster");
list.append("Snake");
list.append("Turtle");

list.prepend("Crocodile");
list.prepend("Lion");

console.log(list.toString());

console.log(list.getHead());
console.log(list.getTail());

console.log(list.At(2));
console.log(list.At(7));
console.log(list.At(9));

console.log(list.pop());
console.log(list.pop());

console.log(list.contains("Tiger"));
console.log(list.contains("Crocodile"));
console.log(list.contains("Lion"));

console.log(list.find("Zebra"));
console.log(list.find("Crocodile"));
console.log(list.find("Lion"));

console.log(list.insertAt("Monkey", 0));
console.log(list.insertAt("Frog", 4));
console.log(list.insertAt("Elephant", 10));

console.log(list.toString());

console.log(list.removeAt(0));
console.log(list.removeAt(4));
console.log(list.removeAt(10));

console.log(list.toString());
console.log(list.size()) // 8