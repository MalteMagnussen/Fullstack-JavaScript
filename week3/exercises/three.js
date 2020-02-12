// 3 Async functions in serial and in parallel
//  Execution in serial
//  Use fetch and async/await to complete fetchPerson(..)below.
// When implemented, each line in printNames() must be executed “sequentially”. Verify this with the debugger.

const URL = "https://swapi.co/api/people/";
const fetch = require("node-fetch");

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
printNames();
