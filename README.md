# TOP Binary Search Tree

My JavaScript implementation of a binary search tree data structure for a TOP project.

## Project Overview

To create a tree, make an instance of the `Tree` class. An array of integers can be supplied to populate the tree.

The tree has the following public methods:

-   `insert()`: Add a node with the given value to the tree.
-   `delete()`: Removes a node with the given value.
-   `find()`: Returns a node with the given value in the tree.
-   `iterativeLevelOrder()`: Traverses the tree in a breadth-first manner. By default, it returns an array with the values of the tree in level-order. _Can optionally take a callback function, which is invoked on each node in level-order._
-   `recursiveLevelOrder()`: Same function as `iterativeLevelOrder()` but implemented using recursion. Makes use of a queue to allow us to imitate BFS.
-   `preOrder()`: Traverses the tree in a depth-first manner. By default, it returns an array with the values of the tree in pre-order. _Can optionally take a callback function, which is invoked on each node in pre-order._
-   `inOrder()`: Traverses the tree in a depth-first manner. By default, it returns an array with the values of the tree in-order. Can be used to provide the sorted array with which the tree was built. _Can optionally take a callback function, which is invoked on each node in-order._
-   `postOrder()`: Traverses the tree in a depth-first manner. By default, it returns an array with the values of the tree in post-order. _Can optionally take a callback function, which is invoked on each node in post-order._
-   `height()`: Returns a given node's height in the tree. Height is defined as the number of edges from a node to a leaf node.
-   `depth()`: Returns a given node's depth in the tree. Depth is defined as the number of edges from a node to the root of the tree.
-   `isBalanced()`: Returns a boolean for whether the tree is currently balanced or not. A balanced tree is one where the difference in height of its left and right subtrees is not greater than 1.
-   `rebalance()`: Rebalances the tree.
-   `prettyPrint()`: Prints the tree in a human-readable format.

The project has a driver script, `main.js`, that showcases many of the methods above.

To run `main.js`, first initiate the project files and then run `node main.js`.
