import * as mongo from "mongodb";
const MongoClient = mongo.MongoClient;
import setup from "../src/config/setupDB";
import UserFacade from "../src/facades/userFacadeWithDB";
import { expect } from "chai";
import { bryptAsync } from "../src/utils/bcrypt-async-helper";
import { ApiError } from "../src/errors/apiError";

let userCollection: mongo.Collection | null;
let client: mongo.MongoClient;

// function checkCollection(collection: mongo.Collection) {
//   if (collection === null) {
//     throw new Error("Collection was null")
//   }
// }

describe("Verify the UserFacade", () => {
  before(async () => {
    client = await setup();
    process.env["DB_NAME"] = "semester_case_test";
    const db = await UserFacade.setDatabase(client);
    if (!db) {
      throw new Error("Database not intialized");
    }
    userCollection = db.collection("users");
    if (userCollection === null) {
      throw new Error("userCollection null in before");
    }
  });
  after(async () => {
    await client.close();
  });
  beforeEach(async () => {
    if (userCollection === null) {
      throw new Error("userCollection null in beforeEach");
    }
    await userCollection.deleteMany({});
    const secretHashed = await bryptAsync("secret");
    await userCollection.insertMany([
      {
        name: "Peter Pan",
        userName: "pp@b.dk",
        password: secretHashed,
        role: "user"
      },
      {
        name: "Donald Duck",
        userName: "dd@b.dk",
        password: secretHashed,
        role: "user"
      },
      {
        name: "admin",
        userName: "admin@a.dk",
        password: secretHashed,
        role: "admin"
      }
    ]);
  });

  it("Should Add the user Kurt", async () => {
    const newUser = {
      name: "Jan Olsen",
      userName: "jo@b.dk",
      password: "secret",
      role: "user"
    };
    try {
      const status = await UserFacade.addUser(newUser);
      expect(status).to.be.equal("User was added");

      if (userCollection === null) {
        throw new Error("Collection was null");
      }
      const jan = await userCollection.findOne({ userName: "jo@b.dk" });
      expect(jan.name).to.be.equal("Jan Olsen");
    } catch (err) {
    } finally {
    }
  });

  it("Should remove the user Peter", async () => {
    try {
      const status = await UserFacade.deleteUser("pp@b.dk");
      expect(status).to.be.equal("User was deleted");
      if (userCollection === null) {
        throw new Error("Collection was null");
      }
      const peter = await userCollection.findOne({ userName: "pp@b.dk" });
      expect(peter).to.be.equal(null);
    } catch (err) {
      throw err;
    } finally {
    }
  });

  it("Should get three users", async () => {
    try {
      const users = await UserFacade.getAllUsers();
      expect(users.length).to.be.equal(3);
    } catch (err) {
      throw err;
    }
  });

  it("Should find Donald Duck", async () => {
    try {
      const donald = await UserFacade.getUser("dd@b.dk");
      expect(donald.name).to.be.equal("Donald Duck");
    } catch (err) {
      throw err;
    }
  });

  it("Should not find xxx.@.b.dk", async () => {
    try {
      const xxx = await UserFacade.getUser("xxx.@.b.dk");
      throw new Error("Should not get here");
    } catch (err) {
      expect(err instanceof ApiError).to.be.equal(true);
      expect(err.message).to.be.equal("User not found");
    } finally {
    }
  });

  it("Should correctly validate Peter Pan's credential,s", async () => {
    try {
      const passwordStatus = await UserFacade.checkUser("pp@b.dk", "xxxx");
      expect(passwordStatus).to.be.true;
    } catch (err) {}
  });

  it("Should NOT correctly validate Peter Pan's check", async () => {
    try {
      const passwordStatus = await UserFacade.checkUser("pp@b.dk", "xxxx");
    } catch (err) {
      expect(err).to.be.false;
    }
  });

  it("Should NOT correctly validate non-existing users check", async () => {
    try {
      const passwordStatus = await UserFacade.checkUser("pxxxx@b.dk", "secret");
    } catch (err) {
      expect(err).to.be.false;
    }
  });
});
