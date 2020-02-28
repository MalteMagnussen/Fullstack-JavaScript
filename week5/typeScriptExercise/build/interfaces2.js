"use strict";
// b) Design a function "implementing" this interface which returns an array with the three strings
let myFunc;
myFunc = (a, b, c) => {
    return [a, b, c];
};
// c) Design another implementation that returns an array, with the three strings uppercased.
let uppercased;
uppercased = (a, b, c) => {
    return [a.toUpperCase(), b.toUpperCase(), c.toUpperCase()];
};
//_________________________________________
// d) The function, given below, uses the ES-6 (and TypeScript) feature
// for destructuring Arrays into individual variables, to simulate a method that uses the interface.
let f2 = function logger(f1) {
    //Simulate that we get data from somewhere and uses the provided function
    let [a, b, c] = ["A", "B", "C"];
    console.log(f1(a, b, c));
};
f2(myFunc);
f2(uppercased);
// e) Test f2 with the two implementations created in b+c.
// f) Verify that f2 cannot be used with functions that do not obey the myFunc interface
//# sourceMappingURL=interfaces2.js.map