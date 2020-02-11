const fetch = require("node-fetch");

const getJokesSequential1 = async () => {
  const jokes = [];
  const joke1 = await fetch(
    "https://api.icndb.com/jokes/random"
  ).then(response => response.json());
  const joke2 = await fetch(
    "https://api.icndb.com/jokes/random"
  ).then(response => response.json());
  jokes.push(joke1.value.joke);
  jokes.push(joke2.value.joke);
  return jokes;
};

const getJokesSequential = async () => {
  const jokes = [];

  for (let index = 0; index < 50; index++) {
    const element = await fetch(
      "https://api.icndb.com/jokes/random"
    ).then(response => response.json());
    jokes.push(element.value.joke);
  }

  return jokes;
};

const getJokesParallel = async () => {
  const promises = [];

  for (let index = 0; index < 50; index++) {
    const element = fetch("https://api.icndb.com/jokes/random").then(response =>
      response.json()
    );
    promises.push(element);
  }

  const all = await Promise.all(promises);

  return all.map(joke => joke.value.joke);
};

(async () => {
  const jokes = await getJokesParallel();
  console.log(jokes);
})();
