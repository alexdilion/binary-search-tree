#!/usr/bin/env node

import Node from "./node.js";

export default class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    #deduplicateAndSort(array) {
        return [...new Set(array)].sort((a, b) => a - b);
    }

    buildTree(array) {
        if (array.length === 0) return null;

        const data = this.#deduplicateAndSort(array);
        const mid = Math.floor(data.length / 2);

        const root = new Node(data[mid]);
        root.left = this.buildTree(data.slice(0, mid));
        root.right = this.buildTree(data.slice(mid + 1));

        return root;
    }

    insert(key, root = this.root) {
        if (!root) return new Node(key);

        if (root.key < key) {
            root.right = this.insert(key, root.right);
        } else if (root.key > key) {
            root.left = this.insert(key, root.left);
        }

        return root;
    }

    #findMinKey(root) {
        let minNode = root;

        while (minNode.left) {
            minNode = minNode.left;
        }

        return minNode;
    }

    delete(key, root = this.root) {
        if (!root) return root;

        if (root.key < key) {
            root.right = this.delete(key, root.right);
        } else if (root.key > key) {
            root.left = this.delete(key, root.left);
        } else {
            if (!root.left) {
                const tmp = root.right;
                root = null;
                return tmp;
            } else if (!root.right) {
                const tmp = root.left;
                root = null;
                return tmp;
            }

            let tmp = this.#findMinKey(root.right);
            root.key = tmp.key;
            root.right = this.delete(tmp.key, root.right);

            return root;
        }

        return root;
    }

    find(key, root = this.root) {
        if (!root || root.key === key) return root;

        if (root.key < key) {
            root = this.find(key, root.right);
        } else {
            root = this.find(key, root.left);
        }

        return root;
    }

    #getChildNodes(root) {
        const children = [];
        if (root.left) children.push(root.left);
        if (root.right) children.push(root.right);
        return children;
    }

    iterativeLevelOrder(callback = null) {
        const nodeQueue = [this.root];
        const keys = [];

        while (nodeQueue.length !== 0) {
            const node = nodeQueue.shift();

            callback ? callback(node) : keys.push(node.key);

            nodeQueue.push(...this.#getChildNodes(node));
        }

        if (!callback) return keys;
    }

    recursiveLevelOrder(callback = null, root = this.root, queue = [], keys = []) {
        if (!root) return;

        callback ? callback(root) : keys.push(root.key);

        queue.push(...this.#getChildNodes(root));

        // a shift on an empty queue returns undefined causing the function
        // to assign root back to its default value -> infinite recursive loop
        this.recursiveLevelOrder(callback, queue.shift() ?? null, queue, keys);

        if (!callback) return keys;
    }

    preOrder(callback = null, root = this.root, keys = []) {
        if (!root) return;

        callback ? callback(root) : keys.push(root.key);

        this.preOrder(callback, root.left, keys);
        this.preOrder(callback, root.right, keys);

        if (!callback) return keys;
    }

    inOrder(callback = null, root = this.root, keys = []) {
        if (!root) return;

        this.inOrder(callback, root.left, keys);

        callback ? callback(root) : keys.push(root.key);

        this.inOrder(callback, root.right, keys);

        if (!callback) return keys;
    }

    postOrder(callback = null, root = this.root, keys = []) {
        if (!root) return;

        this.postOrder(callback, root.left, keys);
        this.postOrder(callback, root.right, keys);

        callback ? callback(root) : keys.push(root.key);

        if (!callback) return keys;
    }

    height(root = this.root) {
        if (!root) return -1;

        let leftHeight = this.height(root.left);
        let rightHeight = this.height(root.right);

        return leftHeight > rightHeight ? leftHeight + 1 : rightHeight + 1;
    }

    depth(target, root = this.root, depth = 0) {
        if (!target || !target) {
            return -1;
        } else {
            if (root.key === target.key) return 0;

            if (root.key > target.key) {
                depth = this.depth(target, root.left, depth) + 1;
            } else {
                depth = this.depth(target, root.right, depth) + 1;
            }

            return depth;
        }
    }

    isBalanced(root = this.root) {
        if (!root) return 1;

        let leftHeight = this.height(root.left);
        let rightHeight = this.height(root.right);

        if (
            Math.abs(leftHeight - rightHeight) <= 1 &&
            this.isBalanced(root.left) &&
            this.isBalanced(root.right)
        ) {
            return true;
        }

        return false;
    }

    rebalance() {
        const keys = this.inOrder();
        this.root = this.buildTree(keys);
    }

    prettyPrint(root = this.root, prefix = "", isLeft = true) {
        if (!root) {
            return;
        }

        if (root.right) {
            this.prettyPrint(root.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }

        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${root.key}`);

        if (root.left) {
            this.prettyPrint(root.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
}
