const EventEmitter = require("events");

var url = "http://mylogger.io/log";

// Pascal case convention
class Logger extends EventEmitter {
  // Method of Logger
  log = message => {
    // send an HTTP request
    console.log(message);

    // Raise an event
    this.emit(
      "messageLogged",
      /* Event arguments: */
      { id: 1, url: "http://something" }
    );
    // Emit means making a noise - signalling

    // Raise: Logging (data: message)
    this.emit("messageLogged", { data: "My Message" });
  };
}

module.exports = Logger;
// module.exports.endPoint = url;
