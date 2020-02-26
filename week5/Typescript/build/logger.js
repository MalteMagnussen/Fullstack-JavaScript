"use strict";
const logger = (a, b) => {
    console.log(`Value 1: ${a}, Value 2: ${b}`);
};
let a = 12;
let b = "Hello World";
logger(a, b);
const loggerV2 = (a, b) => {
    console.log(`Name of Person: ${JSON.stringify(a)}, Address: ${b.address}`);
};
const person = { name: "Kurt" };
const address = { address: "123 Main St" };
loggerV2(person, address);
//# sourceMappingURL=logger.js.map