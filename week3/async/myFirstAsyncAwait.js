// example from https://youtu.be/XgQTzd5c5qE

var myPromise = (txt, delay) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simple errohandling example in 4 lines below.
      // const err = true;
      // if (err) {
      //     return reject(new Error("Ups"))
      // }
      resolve("Hello" + txt);
    }, delay);
  });

const faError = async () => {
  try {
    let p = myPromise("hello", 1000);
    const msg = await p;
    console.log("Result: " + msg);
  } catch (err) {
    console.log("Error: " + err.message);
  }
};

// Intermediate example
// Sequential
const getPlanetforFirstSpeciesInFirstMovieForPersonAsync = async id => {
  try {
    const n = await fetch(URL + id).then(res => res.json());
    const f = await fetch(n.films[0]).then(res => res.json());
    const s = await fetch(f.species[0]).then(res => res.json());
    const p = await fetch(s.homeworld).then(res => res.json());
    return `Name: ${n.name}, Title: ${f.title}, Specie: ${s.name}, Planet: ${p.name}`;
  } catch (error) {
    console.log(error);
  }
};

// Serial
const serial = async () => {
  const res1 = await fetch("https://swapi.co/api/people/1").then(res =>
    res.json()
  );
  const res2 = await fetch("https://swapi.co/api/people/2").then(res =>
    res.json()
  );
  console.log(res1.name);
  console.log(res2.name);
};

// Not sequential, but async
const parallel = async () => {
  // These requests execute in parallel (don't use await here)
  const promise1 = fetch("https://swapi.co/api/people/1").then(res =>
    res.json()
  );
  const promise2 = fetch("https://swapi.co/api/people/2").then(res =>
    res.json()
  );
  // Now use await
  const res1 = await promise1;
  const res2 = await promise2;
  console.log(res1.name);
  console.log(res2.name);
};
