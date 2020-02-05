const EventEmitter = require("events");

// 2) Simple DOS-detector file
// Create a file dosDetector.js and paste in the code below.
// It's the start code for an event-based control which should
// fire (emit) an event "DosDetected" if the same URL is added more
// than once before the time-interval TIME_BETWEEN_CALLS has expired.
class DOS_Detector extends EventEmitter {
  // timeValue = Minimum acceptable time between calls.
  constructor(timeValue) {
    super();
    // Map of key: url, value: time when last call was made.
    this.urls = new Map();
    // Acceptable time between calls from one url.
    this.TIME_BETWEEN_CALLS = timeValue;
  }
  /**
   * Method to call when a new url requests site.
   * @param url: String
   */
  addUrl = url => {
    // Get current time
    const time = new Date().getTime();
    // If URL exists in map already.
    if (this.urls.has(url)) {
      // Take current time and substract the time when last call from that URL was made.
      const deltaTime = time - this.urls.get(url);
      // If that delta time is less than the acceptable time between calls, then fire DosDetected event.
      if (deltaTime < this.TIME_BETWEEN_CALLS) {
        // console.log("TODO: Fire the 'DosDetected' event");
        //Add this info to the event {url:url,timeBetweenCalls:deltaTime}
        // Fire event
        this.emit("DosDetected", { url: url, timeBetweenCalls: deltaTime });
      }
    }
    // Add url to map with current time.
    this.urls.set(url, time);
  };
}
// Export the class using nodes CommonJS module system (require/exports)
module.exports.DOS = DOS_Detector;
// Hints: Observe how this code uses JavaScripts Map
// (not the map-method on an Array, but the type Map) to store URLs,
// and how the URL itself is used as the key.
