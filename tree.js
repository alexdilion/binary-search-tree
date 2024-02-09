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

    insert(value, root = this.root) {
        if (!root) return new Node(value);

        if (root.value < value) {
            root.right = this.insert(value, root.right);
        } else if (root.value > value) {
            root.left = this.insert(value, root.left);
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

    delete(value, root = this.root) {
        if (!root) return root;

        if (root.value < value) {
            root.right = this.delete(value, root.right);
        } else if (root.value > value) {
            root.left = this.delete(value, root.left);
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
            root.value = tmp.value;
            root.right = this.delete(tmp.value, root.right);

            return root;
        }

        return root;
    }

    find(value, root = this.root) {
        if (!root || root.value === value) return root;

        if (root.value < value) {
            root = this.find(value, root.right);
        } else {
            root = this.find(value, root.left);
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
        const values = [];

        while (nodeQueue.length !== 0) {
            const node = nodeQueue.shift();

            callback ? callback(node) : values.push(node.value);

            nodeQueue.push(...this.#getChildNodes(node));
        }

        if (!callback) return values;
    }

    recursiveLevelOrder(callback = null, root = this.root, queue = [], values = []) {
        if (!root) return;

        callback ? callback(root) : values.push(root.value);

        queue.push(...this.#getChildNodes(root));

        // a shift on an empty queue returns undefined causing the function
        // to assign root back to its default value -> infinite recursive loop
        this.recursiveLevelOrder(callback, queue.shift() ?? null, queue, values);

        if (!callback) return values;
    }

    preOrder(callback = null, root = this.root, values = []) {
        if (!root) return;

        callback ? callback(root) : values.push(root.value);

        this.preOrder(callback, root.left, values);
        this.preOrder(callback, root.right, values);

        if (!callback) return values;
    }

    inOrder(callback = null, root = this.root, values = []) {
        if (!root) return;

        this.inOrder(callback, root.left, values);

        callback ? callback(root) : values.push(root.value);

        this.inOrder(callback, root.right, values);

        if (!callback) return values;
    }

    postOrder(callback = null, root = this.root, values = []) {
        if (!root) return;

        this.postOrder(callback, root.left, values);
        this.postOrder(callback, root.right, values);

        callback ? callback(root) : values.push(root.value);

        if (!callback) return values;
    }

    height(root = this.root) {
        if (!root) return -1;

        let leftHeight = this.height(root.left);
        let rightHeight = this.height(root.right);

        return leftHeight > rightHeight ? leftHeight + 1 : rightHeight + 1;
    }

    depth(target, root = this.root, depth = 0) {
        if (!target || !target) return -1;
        if (root.value === target.value) return 0;

        if (root.value > target.value) {
            depth = this.depth(target, root.left, depth) + 1;
        } else {
            depth = this.depth(target, root.right, depth) + 1;
        }

        return depth;
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
        const values = this.inOrder();
        this.root = this.buildTree(values);
    }

    prettyPrint(root = this.root, prefix = "", isLeft = true) {
        if (!root) {
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
