"use strict";
/**
 * Generics
 */
/**
  * a) Implement a generic function which will take an array of any kind,
and return the array reversed (just use the built-in reverse function),
so the three first calls below will print the reversed array, and the last call will fail.

  */
const reverseArr = (arr) => {
    return arr.reverse();
};
console.log(reverseArr(["a", "b", "c"]));
console.log(reverseArr([1, 2, 3]));
console.log(reverseArr([true, true, false]));
// console.log(
//   reverseArr<number>(["a", "b", "c"])
// );
/**
 *
b) Implement a generic Class DataHolder that will allow us to create instances as sketched below:


Verify that once created, an instance can only be used with the type it was created from.
c) Rewrite the example above to user getters and setters instead of the silly getXX and setXX methods

 */
class DataHolder {
    constructor(value) {
        this._value = value;
    }
    //   getValue = () => {
    //     return this._value;
    //   };
    //   setValue = (value: T) => {
    //     this._value = value;
    //   };
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
}
let d = new DataHolder("Hello");
// console.log(d.getValue());
// d.setValue("World");
// console.log(d.getValue());
console.log(d.value);
// d.value = 500 // 500 (number) is not assignable to type string
console.log(d.value);
let d2 = new DataHolder(123);
// console.log(d2.getValue());
// d2.setValue(500);
// console.log(d2.getValue());
console.log(d2.value);
//d2.value = "World"; //Type '"World"' is not assignable to type 'number'.ts(2322)
console.log(d2.value);
//# sourceMappingURL=generics.js.map