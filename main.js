import Tree from "./tree.js";

function randomNumber(start, end) {
    return start + Math.floor(Math.random() * (end - start));
}

function generateRandomArray(size) {
    const usedNumbers = Array(size);
    const array = [];
    let numbersLeft = size;

    while (numbersLeft > 0) {
        let n = randomNumber(1, 100);

        if (!usedNumbers[n]) {
            array.push(n);
            usedNumbers[n] = true;
            numbersLeft -= 1;
        }
    }

    return array;
}

function orderPrettyPrint(node) {
    process.stdout.write(node.key + " ");
}

function lineBreak() {
    console.log("\n--------------------------------------------------------------------\n");
}

const tree = new Tree(generateRandomArray(9));

lineBreak();

console.log("Current graph of tree:\n");
tree.prettyPrint(tree.root);
console.log(`\nTree is balanced: ${tree.isBalanced(tree.root)}\n`);

console.log("Level-order keys:");
tree.recursiveLevelOrder(tree.root, orderPrettyPrint);
console.log("\n");

console.log("Pre-order keys:");
tree.preOrder(tree.root, orderPrettyPrint);
console.log("\n");

console.log("In-order keys:");
tree.inOrder(tree.root, orderPrettyPrint);
console.log("\n");

console.log("Post-order keys:");
tree.postOrder(tree.root, orderPrettyPrint);
console.log();
lineBreak();

tree.insert(tree.root, randomNumber(101, 1000));
tree.insert(tree.root, randomNumber(101, 1000));
tree.insert(tree.root, randomNumber(101, 1000));
tree.insert(tree.root, randomNumber(101, 1000));
tree.insert(tree.root, randomNumber(101, 1000));

console.log("Inserting numbers greater than 100.. New tree:\n");
tree.prettyPrint(tree.root);
console.log(`\nTree is balanced: ${tree.isBalanced(tree.root)}`);
lineBreak();

console.log("Balancing tree... New tree:\n");
tree.rebalance();
tree.prettyPrint(tree.root);
console.log(`\nTree is balanced: ${tree.isBalanced(tree.root)}\n`);

console.log("Level-order keys:");
tree.recursiveLevelOrder(tree.root, orderPrettyPrint);
console.log("\n");

console.log("Pre-order keys:");
tree.preOrder(tree.root, orderPrettyPrint);
console.log("\n");

console.log("In-order keys:");
tree.inOrder(tree.root, orderPrettyPrint);
console.log("\n");

console.log("Post-order keys:");
tree.postOrder(tree.root, orderPrettyPrint);
console.log();
lineBreak();
