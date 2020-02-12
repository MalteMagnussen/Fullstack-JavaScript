/* 
The data we will use for this exercise will not make any business sense but should 
serve well to visualize the general idea in this kind of designs

You should use the five links below to simulate the requests to a number of "different" servers:
https://jsonplaceholder.typicode.com/photos?albumId=1 
https://jsonplaceholder.typicode.com/photos?albumId=3
https://jsonplaceholder.typicode.com/photos?albumId=5
https://jsonplaceholder.typicode.com/photos?albumId=7
https://jsonplaceholder.typicode.com/photos?albumId=9 
You could remove the query parameter from the request, 
and obtain all data from this dummy service with a single request, 
but that would not demonstrate what you are supposed to learn from this exercise. 
So use the links above, and perform five separate requests.

a)  Test one of the URL's and inspect the JSON you receive 
(observe how the albumId is repeated for all albums,
     even when we requested items only with a given id). 

Now use es2005 Promises to fetch and combine data from all five URL's
Make a response which includes the results for all the five requests, but manipulated as follows:
Use filter to include only out only those albums where the title contains exactly three words
Use map to include only the id and title of each album

This is how your final data should be built: http://promises.cooljavascript.dk/api/albumthreewords 

b)  Refactor your code (if necessary) into a node module, and export it

c) Implement a REST-endpoint that returns a JSON-object (as in the example above), given this URL: 
	api/albumthreewords
*/

const fetch = require("node-fetch");

const url = "https://jsonplaceholder.typicode.com/photos?albumId=";

const getAlbumById = id => {
  return new Promise((resolve, reject) => {
    const albums = fetch(url + id).then(res => res.json());
    resolve(albums);
  });
};

const getAlbums = async idList => {
  let albums = [];
  for (const id of idList) {
    albums.push(getAlbumById(id));
  }

  return await Promise.all(albums);
};

// getAlbums([1]).then(res => console.log(res));

module.exports.getAlbums = getAlbums;
