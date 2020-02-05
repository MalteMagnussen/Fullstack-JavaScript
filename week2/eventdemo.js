const EventEmitter = require("events");

class MyEventPublisher extends EventEmitter {
  __numbers = [];

  addNumber(number) {
    this.__numbers.push(number);
  }
}

const publisher = new MyEventPublisher();

publisher.addNumber(10);
