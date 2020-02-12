const fetch = require("node-fetch");

// 2 Chaining promises (fetch requests), and why GraphQL is cool ;-)

// Enter this URL in your browser: https://swapi.co/api/people/3/

// {
//     "name": "R2-D2",
//     "height": "96",
//     "mass": "32",
//     "hair_color": "n/a",
//     "skin_color": "white, blue",
//     "eye_color": "red",
//     "birth_year": "33BBY",
//     "gender": "n/a",
//     "homeworld": "https://swapi.co/api/planets/8/",
//     "films": [
//         "https://swapi.co/api/films/2/",
//         "https://swapi.co/api/films/5/",
//         "https://swapi.co/api/films/4/",
//         "https://swapi.co/api/films/6/",
//         "https://swapi.co/api/films/3/",
//         "https://swapi.co/api/films/1/",
//         "https://swapi.co/api/films/7/"
//     ],
//     "species": [
//         "https://swapi.co/api/species/2/"
//     ],
//     "vehicles": [],
//     "starships": [],
//     "created": "2014-12-10T15:11:50.376000Z",
//     "edited": "2014-12-20T21:17:50.311000Z",
//     "url": "https://swapi.co/api/people/3/"
// }

// Use information from this link to find the first movie in which  Luke Skywalker  appeared

// Use information from this link to find the first species, which appeared in this movie

// Use information from this link to find the planet (homeworld) for this species

const asyncLuke = async () => {
  try {
    const data = await fetch("https://swapi.co/api/people/3/").then(res =>
      res.json()
    );
    console.log("People/3", data);
    let aNewHope;
    for (const film of data.films) {
      const movie = await fetch(film).then(res => res.json());
      if (movie.title == "A New Hope") {
        aNewHope = movie;
      }
    }
    console.log("A New Hope", aNewHope); // First movie in which Luke Skywalker appeared.
    const species = await fetch(aNewHope.species[0]).then(res => res.json());
    console.log("First Species of", aNewHope.title, species);
    const homeworld = await fetch(species.homeworld).then(res => res.json());
    console.log("Homeworld of", species.name, homeworld);
  } catch (error) {
    console.log(`UPPS: ${error}`);
  } finally {
    console.log("Done");
  }
};
asyncLuke();
