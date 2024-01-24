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

    insert(root, value) {
        if (!root) return new Node(value);

        if (root.value < value) {
            root.right = this.insert(root.right, value);
        } else if (root.value > value) {
            root.left = this.insert(root.left, value);
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

    delete(root, value) {
        if (!root) return root;

        if (root.value < value) {
            root.right = this.delete(root.right, value);
        } else if (root.value > value) {
            root.left = this.delete(root.left, value);
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
            root.value = temp.value;
            root.right = this.delete(root.right, temp.value);

            return root;
        }

        return root;
    }

    find(root, value) {
        if (!root || root.value === value) return root;

        if (root.value < value) {
            root = this.find(root.right, value);
        } else {
            root = this.find(root.left, value);
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

        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${root.value}`);

        if (root.left) {
            this.prettyPrint(root.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
}
