// 3 Async functions in serial and in parallel
//  Execution in serial
//  Use fetch and async/await to complete fetchPerson(..)below.
// When implemented, each line in printNames() must be executed “sequentially”. Verify this with the debugger.

const URL = "https://swapi.co/api/people/";
const fetch = require("node-fetch");
var now = require("performance-now");

const fetchPerson = async url => {
  //Complete this function
  return await fetch(url)
    .then(res => res.json())
    .catch(err => console.log(err.message));
};
async function printNames() {
  console.log("Before");

  const person1 = await fetchPerson(URL + "1");
  const person2 = await fetchPerson(URL + "2");
  console.log(person1.name);
  console.log(person2.name);
  console.log("After all");
}

const calulateTime = async func => {
  var start = now();
  await func();
  var end = now();
  console.log(
    "Time spent:",
    (end - start).toFixed(3),
    "in milliseconds.\n1 second == 1000 milliseconds."
  ); // ~ 0.002 on my system
};

// calulateTime(printNames);

/*
Execution in parallel
Fix the problem above, so that HTTP-requests are made in parallel.
Measure the time spent the same way as above, 
to convince yourself that; 
knowing how and when to perform request in serial or parallel is important.
*/
async function printNames2() {
  console.log("Before");

  const promise1 = fetchPerson(URL + "1");
  const promise2 = fetchPerson(URL + "2");

  (await Promise.all([promise1, promise2])).forEach(element =>
    console.log(element.name)
  );

  console.log("After all");
}

calulateTime(printNames2);
