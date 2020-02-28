/* 
Interfaces 2 (Function types)
a) Create an interface to describe a function: myFunc that should take three string parameters and return a String Array.
*/
interface ImyFunc {
  (a: string, b: string, c: string): string[];
}

// b) Design a function "implementing" this interface which returns an array with the three strings
let myFunc: ImyFunc;
myFunc = (a: string, b: string, c: string) => {
  return [a, b, c];
};

// c) Design another implementation that returns an array, with the three strings uppercased.
let uppercased: ImyFunc;
uppercased = (a: string, b: string, c: string) => {
  return [a.toUpperCase(), b.toUpperCase(), c.toUpperCase()];
};

//_________________________________________

// d) The function, given below, uses the ES-6 (and TypeScript) feature
// for destructuring Arrays into individual variables, to simulate a method that uses the interface.
let f2 = function logger(f1: ImyFunc) {
  //Simulate that we get data from somewhere and uses the provided function
  let [a, b, c] = ["A", "B", "C"];
  console.log(f1(a, b, c));
};
f2(myFunc);
f2(uppercased);
// e) Test f2 with the two implementations created in b+c.
// f) Verify that f2 cannot be used with functions that do not obey the myFunc interface
const test = (a: number, b: number, c: number) => {
  return [a, b, c];
};
//f2(test);
