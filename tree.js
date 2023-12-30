#!/usr/bin/env node

import Node from "./node.js";

export default class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    #sortAndDeduplicate(array) {
        return [...new Set(array)].sort((a, b) => a - b);
    }

    buildTree(array) {
        if (array.length === 0) return null;

        const data = this.#sortAndDeduplicate(array);
        const mid = Math.floor((data.length - 1) / 2);

        const root = new Node(data[mid]);
        root.left = this.buildTree(data.slice(0, mid));
        root.right = this.buildTree(data.slice(mid + 1));

        return root;
    }

    insert(value, node = this.root) {
        if (!node) return new Node(value);

        if (value === node.value) {
            return node;
        } else if (value < node.value) {
            node.left = this.insert(value, node.left);
        } else if (value > node.value) {
            node.right = this.insert(value, node.right);
        }

        return node;
    }

    prettyPrint(node, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }

        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }

        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);

        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
}
