// e)  Implement a simple REST-endpoint that returns a
// JSON-object as sketched above, given this URL: 	api/securerandoms
const http = require("http");

const getSecureRandoms = require("./getSecureRandoms");

const firstEndpoint = "/api/securerandoms";

const server = http.createServer((request, response) => {
  if (request.url === firstEndpoint) {
    response.setHeader("Content-Type", "application/json");
    //Return a response with OS-info, using the code implemented in part-a
    (async sizeList => {
      const randoms = await getSecureRandoms([48, 40, 32, 24, 16, 8]);
      console.log(randoms);
      response.write(
        JSON.stringify(
          { title: "6 secure randoms", randoms: [...randoms] },
          null,
          4
        )
      );
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
