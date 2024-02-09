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
tree.prettyPrint();
console.log(`\nTree is balanced: ${tree.isBalanced()}\n`);

console.log("Level-order keys:");
tree.recursiveLevelOrder(orderPrettyPrint);
console.log("\n");

console.log("Pre-order keys:");
tree.preOrder(orderPrettyPrint);
console.log("\n");

console.log("In-order keys:");
tree.inOrder(orderPrettyPrint);
console.log("\n");

console.log("Post-order keys:");
tree.postOrder(orderPrettyPrint);
console.log();
lineBreak();

tree.insert(randomNumber(101, 1000));
tree.insert(randomNumber(101, 1000));
tree.insert(randomNumber(101, 1000));
tree.insert(randomNumber(101, 1000));
tree.insert(randomNumber(101, 1000));

console.log("Inserting numbers greater than 100.. New tree:\n");
tree.prettyPrint();
console.log(`\nTree is balanced: ${tree.isBalanced()}`);
lineBreak();

console.log("Balancing tree... New tree:\n");
tree.rebalance();
tree.prettyPrint();
console.log(`\nTree is balanced: ${tree.isBalanced()}\n`);

console.log("Level-order keys:");
tree.recursiveLevelOrder(orderPrettyPrint);
console.log("\n");

console.log("Pre-order keys:");
tree.preOrder(orderPrettyPrint);
console.log("\n");

console.log("In-order keys:");
tree.inOrder(orderPrettyPrint);
console.log("\n");

console.log("Post-order keys:");
tree.postOrder(orderPrettyPrint);
console.log();
lineBreak();
