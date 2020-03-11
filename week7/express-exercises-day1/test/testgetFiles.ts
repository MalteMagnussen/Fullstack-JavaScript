const expect = require("chai").expect;
import { getFileNames } from "../src/utils/getFiles";
const fs = require("fs-extra");

const debug = require("debug")("game-project");

/**
fs.mkdirSync(..) 	Create a Directory
fs.writeFileSync(..)	Creates a file
fs.removeSync(..)	Deletes a folder and its content
 */

describe("Test getFiles.ts", () => {
  before(function() {
    // runs once before the first test in this block
    fs.mkdirSync("testFiles");
    fs.writeFileSync("testFiles/1.txt");
    fs.writeFileSync("testFiles/2.txt");
    fs.writeFileSync("testFiles/3.txt");
  });

  after(function() {
    // runs once after the last test in this block
    fs.removeSync("testFiles");
  });

  beforeEach(function() {
    // runs before each test in this block
  });

  afterEach(function() {
    // runs after each test in this block
  });

  // test cases

  it("CheckFiles", () => {
    getFileNames(
      "C:UsersMalteDocumentsGitHubFullstack-JavaScriptweek7express-exercises-day1\test\testFiles",
      ".txt",
      (err: any, data: any) => {
        if (err) {
          debug("An error occurred while testing: " + err);
        } else {
          expect(data).to.equal(["1.txt", "2.txt", "3.txt"]);
        }
      }
    );
  });
});
