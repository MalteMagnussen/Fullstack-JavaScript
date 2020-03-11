const expect = require("chai").expect;
import UserFacade from "../facades/user";
const debug = require("debug")("game-project");

/**
fs.mkdirSync(..) 	Create a Directory
fs.writeFileSync(..)	Creates a file
fs.removeSync(..)	Deletes a folder and its content
 */

describe("Test getFiles.ts", () => {
  before(function() {
    // runs once before the first test in this block
  });

  after(function() {
    // runs once after the last test in this block
  });

  beforeEach(function() {
    // runs before each test in this block
  });

  afterEach(function() {
    // runs after each test in this block
  });

  // test cases

  it("CheckFiles", () => {
    expect(data).to.equal(["1.txt", "2.txt", "3.txt"]);
  });
});
