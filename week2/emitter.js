const Logger = require("./logger");
const logger = new Logger();

// Register a listener
//emitter.addListener
logger.on("messageLogged", event => {
  // e, eventArg, event
  console.log("Listener Called.", event);
});

logger.log("message");
