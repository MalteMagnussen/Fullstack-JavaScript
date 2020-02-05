// Create a simple test file that should import the class, make an instance,
// and test the behaviour by adding the same URL more than once
// (use setTimeout to make the second call)

const dos = require("./dosDetector");

console.log(dos);

const myDos = new dos.DOS(2000);

console.log(myDos);

// Initial call
myDos.addUrl(10);

// Ekstra "DDOS" call before the 2000 in myDos
setTimeout(() => {
  myDos.addUrl(10);
}, 1800);

// Detect DDOS
myDos.on("DosDetected", event => {
  console.log("Attack Detected: ", event);
});
