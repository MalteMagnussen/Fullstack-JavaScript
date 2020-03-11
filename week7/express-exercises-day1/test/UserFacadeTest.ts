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

describe("Test UserFacade", () => {
  before(async () => {
    // runs once before the first test in this block
    await UserFacade.addUser({
      name: "Test",
      userName: "test@tradewind.dk",
      password: "1234",
      role: "user"
    });
  });

  after(async () => {
    // runs once after the last test in this block
    await UserFacade.deleteUser("Test");
  });

  beforeEach(async () => {
    // runs before each test in this block
  });

  afterEach(async () => {
    // runs after each test in this block
  });

  // test cases

  it("Test of Get All Users.", async () => {
    const users = await UserFacade.getAllUsers();
    expect(users.length).to.be.equal(4);
  });

  it("Test of Add User", async () => {
    const answer = await UserFacade.addUser({
      name: "asdasdasd",
      userName: "23asdfsdfasdf",
      password: "1adsfhsdfhdsfh",
      role: "user"
    });
    expect(answer).to.be.equal("User was added");
  });

  it("Test of Get User", async () => {
    const user = await UserFacade.getUser("test@tradewind.dk");
    expect(user.name).to.be.equal("Test");
    expect(user.role).to.be.equal("user");
    expect(user.userName).to.be.equal("test@tradewind.dk");
  });

  it("Test of checkUser - Positive Case", async () => {
    const answer = await UserFacade.checkUser("test@tradewind.dk", "1234");
    expect(answer).to.be.equal(true);
  });
});
