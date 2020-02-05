// 3) Simple WEB/REST-server using functionality from 1+2
// Create a new file nodeServer.js and add the following code to the file.
// Start the server, and verify that you can access the root page via localhost:3000
const http = require("http");

//Register for the "DosDetected" event and console.log the url and time info.
const dos = require("./dosDetector");

const myDos = new dos.DOS(5000); // I think this is in milliseconds?

// Detect DDOS
myDos.on("DosDetected", event => {
  console.log(
    `Attack Detected: URL: ${event.url} and Time: ${event.timeBetweenCalls}`
  );
});

const server = http.createServer((request, response) => {
  if (request.url === "/api/os-info") {
    response.setHeader("Content-Type", "application/json");
    //Return a response with OS-info, using the code implemented in part-a
    const sysInfo = require("./Exercise01");
    response.write(JSON.stringify(sysInfo.sysInfo()));
    console.log(sysInfo.sysInfo());
    return response.end();
  }
  if (request.url === "/") {
    response.setHeader("Content-Type", "text/html");
    response.write(`<h2>Simple node HTTP server demo</h2>
      <p>Exposes this endpoint <code>/api/os-info</code></p>
    `);
    return response.end();
  }
});
server.on("connection", socket => {
  console.log(socket.remoteAddress);
  // You can get the client-IP in here, using sock.remoteAddress)
  myDos.addUrl(socket.remoteAddress);
});
server.listen(3000);
console.log("listening on 3000");

// Add the necessary changes to complete:
// The /api/os-info endpoint
// The DOS-detection feature
