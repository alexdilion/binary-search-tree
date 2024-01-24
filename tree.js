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
                const temp = root.right;
                root = null;
                return temp;
            } else if (!root.right) {
                const temp = root.left;
                root = null;
                return temp;
            }

            let temp = this.#findMinValue(root.right);
            root.key = temp.key;
            root.right = this.delete(root.right, temp.key);

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

    prettyPrint(root, prefix = "", isLeft = true) {
        if (root === null) {
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
