#!/usr/bin/env node

export default class Node {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.right = right;
        this.left = left;
    }
}
