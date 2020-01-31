// b) Implement a function: myMap(array, callback)
// that, provided an array and a callback, provides the same functionality as
// calling the existing map method on an array.
// Test the method with the same array and callback
// as in the example with the original map method.

const testArray = [];
for (let i = 0; i < 100; i++) {
  testArray.push(i);
}

const myMap = (array, callback) => {
  let myArray = [];
  array.forEach(element => {
    myArray.push(callback(element));
  });
  return myArray;
};

const myCallback = element => {
  return element * 2;
};

console.log("My Map method: " + myMap(testArray, myCallback));

console.log("Regular map: " + testArray.map(element => myCallback(element)));
