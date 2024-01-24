#!/usr/bin/env node

export default class Node {
    constructor(key, left = null, right = null) {
        this.key = key;
        this.right = right;
        this.left = left;
    }
}
