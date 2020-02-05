const EventEmitter = require("events");

const consoleInput = process.argv.slice(2).map(element => Number(element));

class MyEventPublisher extends EventEmitter {
  __numbers = [];

  addNumber(number) {
    this.__numbers.push(number);
    if (number % 2 === 0) {
      this.emit("even", { number });
    } else if (number % 2 != 0) {
      this.emit("odd", { number });
    }
    if (number > 100) {
      this.emit("high", { number });
    } else {
      this.emit("low", { number });
    }
  }
}

const publisher = new MyEventPublisher();
publisher.on("odd", number => console.log(`${number.number} is odd`));
publisher.on("even", number => console.log(`${number.number} is even`));
publisher.on("high", number => console.log(`${number.number} is high`));
publisher.on("low", number => console.log(`${number.number} is low`));

consoleInput.forEach(element => publisher.addNumber(element));
