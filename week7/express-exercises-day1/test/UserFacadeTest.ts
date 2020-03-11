const expect = require("chai").expect;
import UserFacade from "../src/facades/user";
const debug = require("debug")("game-project");

/**
fs.mkdirSync(..) 	Create a Directory
fs.writeFileSync(..)	Creates a file
fs.removeSync(..)	Deletes a folder and its content
 */

/**
 * Test:
 * addUser
 * deleteUser
 * getAllUsers
 * getUser
 * checkUser
 *
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

  it("Test of Get All Users.", async () => {
    const users = await UserFacade.getAllUsers();
    debug(users); // Why doesnt this work?
    // console.log(JSON.stringify(users));
    expect(JSON.stringify(users)).to.equal(
      JSON.stringify([
        {
          name: "Peter Pan",
          userName: "pp@b.dk",
          password: "secret",
          role: "user"
        },
        {
          name: "Donald Duck",
          userName: "dd@b.dk",
          password: "secret",
          role: "user"
        },
        {
          name: "admin",
          userName: "admin@a.dk",
          password: "secret",
          role: "admin"
        }
      ])
    );
  });
});
