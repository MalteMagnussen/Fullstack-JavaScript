const fetch = require("node-fetch");
// 2 Chaining promises (fetch requests), and why GraphQL is cool ;-)
// Enter this URL in your browser: https://swapi.co/api/people/3/
// Use information from this link to find the first movie in which  Luke Skywalker  appeared
// Use information from this link to find the first species, which appeared in this movie
// Use information from this link to find the planet (homeworld) for this species
// a) with plain promises
//  Now, Implement a method getPlanetforFirstSpeciesInFirstMovieForPerson(id){} which for id = 1 (Luke Skywalker) should log this info:
// Name: Luke Skywalker
// First film: The Empire Strikes Back
// First species: Yoda's species
// Homeworld for Specie: unknown
// Hints:
// 1) This requires you to make a number of REST-requests (using fetch), read a value from the request, and use this value to perform a new request.
// 2) The lists in the responses are not sorted. For this exercise it’s ok to just use the first URL in the list: Like films[0] will actually give you the second movie, see below:
// "films": [ "https://swapi.co/api/films/2/",
//            "https://swapi.co/api/films/6/",
//            "https://swapi.co/api/films/3/",
//            "https://swapi.co/api/films/1/",
//            "https://swapi.co/api/films/7/"],

//Plain promises
const getPlanetforFirstSpeciesInFirstMovieForPerson = id => {
  fetch("https://swapi.co/api/people/" + id)
    .then(res => res.json())
    .then(data => {
      console.log("Name:", data.name);
      fetch(data.films[0])
        .then(res => res.json())
        .then(firstFilm => {
          console.log("First film:", firstFilm.title);
          fetch(firstFilm.species[0])
            .then(res => res.json())
            .then(species => {
              console.log("First species:", species.name);
              fetch(species.homeworld)
                .then(res => res.json())
                .then(homeworld =>
                  console.log("Homeworld for Specie:", homeworld.name)
                )
                .catch(err => console.log("Error: ", err))
                .finally(() => console.log("Done 4"));
            })
            .catch(err => console.log("Error: ", err))
            .finally(() => console.log("Done 3"));
        })
        .catch(err => console.log("Error: ", err))
        .finally(() => console.log("Done 2"));
    })
    .catch(err => console.log("Error: ", err))
    .finally(() => console.log("Done 1"));
};

const getPlanetforFirstSpeciesInFirstMovieForPersonAsync = async id => {
  try {
    const data = await fetch("https://swapi.co/api/people/" + id).then(res =>
      res.json()
    );

    // console.log("People/3", data);
    // let aNewHope;
    // for (const film of data.films) {
    //   const movie = await fetch(film).then(res => res.json());
    //   if (movie.title == "A New Hope") {
    //     aNewHope = movie;
    //   }
    // }
    console.log("Name: ", data.name);
    const firstFilm = await fetch(data.films[0]).then(res => res.json());
    console.log("First film:", firstFilm.title);
    const species = await fetch(firstFilm.species[0]).then(res => res.json());
    console.log("First species:", species.name);
    const homeworld = await fetch(species.homeworld).then(res => res.json());
    console.log("Homeworld for Specie:", homeworld.name);
    // Name: Luke Skywalker
    // First film: The Empire Strikes Back
    // First species: Yoda's species
    // Homeworld for Specie: unknown
  } catch (error) {
    console.log(`UPPS: ${error}`);
  } finally {
    console.log("Done Async");
  }
};
getPlanetforFirstSpeciesInFirstMovieForPerson(3);
// getPlanetforFirstSpeciesInFirstMovieForPersonAsync(3);
