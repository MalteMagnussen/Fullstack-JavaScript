// c) Implement a REST-endpoint that returns a JSON-object
// (as in the example above), given this URL:
// api/albumthreewords
const http = require("http");

const { getAlbums } = require("./album");

const firstEndpoint = "/api/albumthreewords";

const server = http.createServer((request, response) => {
  if (request.url === firstEndpoint) {
    response.setHeader("Content-Type", "application/json");
    //Return a response with OS-info, using the code implemented in part-a
    (async () => {
      const albumsCollection = await getAlbums([1, 3, 5, 7, 9]);
      const content = [];

      for (const albums of albumsCollection) {
        content.push(
          albums
            .filter(element => {
              return element.title.split(" ").length == 3;
            })
            .map(element => {
              return {
                id: element.id,
                title: element.title
              };
            })
        );
      }

      response.write(JSON.stringify(content, null, 4));
      return response.end();
    })();
  }
  if (request.url === "/") {
    response.setHeader("Content-Type", "text/html");
    response.write(`<h2>Simple node HTTP server demo</h2>
        <p>Exposes this endpoint <a href="http://localhost:3000${firstEndpoint}"><code>${firstEndpoint}</code></a></p>
      `);
    return response.end();
  }
});
server.on("connection", socket => {
  console.log(socket.remoteAddress);
});
server.listen(3000);
console.log("listening on 3000");
