"use strict";
const logger = (a, b) => {
    console.log(`Value 1: ${a}, Value 2: ${b}`);
};
let a = 12;
let b = "Hello World";
const loggerV2 = (a, b) => {
    console.log(`Name of Person: ${JSON.stringify(a)}, Address: ${b.address}`);
};
const person = { name: "Kurt" };
const address = { address: "123 Main St" };
// loggerV2(person, address);
class Person {
    constructor(_name) {
        this._name = _name;
    }
    get name() {
        return this._name;
    }
    set name(val) {
        this._name = val;
    }
}
let p = new Person("Kurt Wonnegut");
p.name = "Hanne Wonnegut";
// loggerV2(p, address);
const loggerV3 = (a, b) => {
    console.log(`Person: ${JSON.stringify(a)}, 
  Address: ${JSON.stringify(b)}`);
};
// loggerV3(a, b);
class GenericLogger {
    constructor() {
        this.log = (a, b) => console.log(`Val1: ${JSON.stringify(a)}, 
  Val2: ${JSON.stringify(b)}`);
    }
}
const logger1 = new GenericLogger();
const logger2 = new GenericLogger();
logger1.log(a, b);
logger2.log(person, address);
//# sourceMappingURL=logger.js.map