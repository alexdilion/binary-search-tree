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

    insert(node, value) {
        if (!node) return new Node(value);

        if (node.value < value) {
            node.right = this.insert(node.right, value);
        } else if (node.value > value) {
            node.left = this.insert(node.left, value);
        }

        return node;
    }

    #findMinValue(node) {
        let minNode = node;

        while (minNode.left) {
            minNode = minNode.left;
        }

        return minNode;
    }

    delete(node, value) {
        if (!node) return null;

        if (node.value < value) {
            node.right = this.delete(node.right, value);
        } else if (node.value > value) {
            node.left = this.delete(node.left, value);
        } else {
            if (!node.left) {
                const temp = node.right;
                node = null;
                return temp;
            } else if (!node.right) {
                const temp = node.left;
                node = null;
                return temp;
            }

            let temp = this.#findMinValue(node.right);
            node.value = temp.value;
            node.right = this.delete(node.right, temp.value);

            return node;
        }

        return node;
    }

    prettyPrint(node, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }

        if (node.right) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }

        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);

        if (node.left) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
}
