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

    insert(root, key) {
        if (!root) return new Node(key);

        if (root.key < key) {
            root.right = this.insert(root.right, key);
        } else if (root.key > key) {
            root.left = this.insert(root.left, key);
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

    delete(root, key) {
        if (!root) return root;

        if (root.key < key) {
            root.right = this.delete(root.right, key);
        } else if (root.key > key) {
            root.left = this.delete(root.left, key);
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
            root.right = this.delete(root.right, tmp.key);

            return root;
        }

        return root;
    }

    find(root, key) {
        if (!root || root.key === key) return root;

        if (root.key < key) {
            root = this.find(root.right, key);
        } else {
            root = this.find(root.left, key);
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

    recursiveLevelOrder(root, callback = null, queue = [], keys = []) {
        if (!root) return;

        callback ? callback(root) : keys.push(root.key);

        queue.push(...this.#getChildNodes(root));
        this.recursiveLevelOrder(queue.shift(), callback, queue, keys);

        if (!callback) return keys;
    }

    preOrder(root, callback = null, keys = []) {
        if (!root) return;

        callback ? callback(root) : keys.push(root.key);

        this.preOrder(root.left, callback, keys);
        this.preOrder(root.right, callback, keys);

        if (!callback) return keys;
    }

    inOrder(root, callback = null, keys = []) {
        if (!root) return;

        this.inOrder(root.left, callback, keys);

        callback ? callback(root) : keys.push(root.key);

        this.inOrder(root.right, callback, keys);

        if (!callback) return keys;
    }

    postOrder(root, callback = null, keys = []) {
        if (!root) return;

        this.postOrder(root.left, callback, keys);
        this.postOrder(root.right, callback, keys);

        callback ? callback(root) : keys.push(root.key);

        if (!callback) return keys;
    }

    height(root) {
        if (!root) return -1;

        let leftHeight = this.height(root.left);
        let rightHeight = this.height(root.right);

        return leftHeight > rightHeight ? leftHeight + 1 : rightHeight + 1;
    }

    depth(root, target, depth = 0) {
        if (!target || !target) {
            return -1;
        } else {
            if (root.key === target.key) return 0;

            if (root.key > target.key) {
                depth = this.depth(root.left, target, depth) + 1;
            } else {
                depth = this.depth(root.right, target, depth) + 1;
            }

            return depth;
        }
    }

    isBalanced(root) {
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
        const keys = this.inOrder(this.root);
        this.root = this.buildTree(keys);
    }

    prettyPrint(root, prefix = "", isLeft = true) {
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
