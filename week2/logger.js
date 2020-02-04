var url = "http://mylogger.io/log";

const log = message => {
  // send an HTTP request
  console.log(message);
};

module.exports = log;
// module.exports.endPoint = url;
