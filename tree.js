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

    #findMinValue(root) {
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

            let tmp = this.#findMinValue(root.right);
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

    #getChildNodes(node) {
        const children = [];
        if (node.left) children.push(node.left);
        if (node.right) children.push(node.right);
        return children;
    }

    iterativeLevelOrder(callback) {
        const nodeQueue = [this.root];

        while (nodeQueue.length !== 0) {
            const node = nodeQueue.shift();
            callback(node);

            nodeQueue.push(...this.#getChildNodes(node));
        }
    }

    recursiveLevelOrder(root, callback, queue = []) {
        if (!root) return;

        callback(root);

        queue.push(...this.#getChildNodes(root));
        this.recursiveLevelOrder(queue.shift(), callback, queue);
    }

    preOrder(root, callback) {
        if (!root) return;

        callback(root);
        this.preOrder(root.left, callback);
        this.preOrder(root.right, callback);
    }

    inOrder(root, callback) {
        if (!root) return;

        this.inOrder(root.left, callback);
        callback(root);
        this.inOrder(root.right, callback);
    }

    postOrder(root, callback) {
        if (!root) return;

        this.postOrder(root.left, callback);
        this.postOrder(root.right, callback);
        callback(root);
    }

    height(root) {
        if (!root) return -1;

        let leftHeight = this.height(root.left);
        let rightHeight = this.height(root.right);

        return leftHeight > rightHeight ? leftHeight + 1 : rightHeight + 1;
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
