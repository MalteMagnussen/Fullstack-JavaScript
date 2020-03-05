const bcrypt = require("bcryptjs");
const debug = require("debug")("game-case");
interface IGameUser {
  name: string;
  userName: string;
  password: string;
  role: string;
}

export const users: Array<IGameUser> = [];
export class UserFacade {
  static addUser(user: IGameUser): boolean {
    /*Info: Import bcrypt and (npm install bcrypt) and hash before you store */
    const saltRounds = 10;
    let myBoolean = false;
    const setPassword = async (user: IGameUser) => {
      await bcrypt.hash(user.password, saltRounds, (err, hash) => {
        if (err) {
          debug(`Error Hashing Password: ${err}`);
        } else {
          user.password = hash;
          users.push(user);
          myBoolean = true;
        }
      });
    };
    setPassword(user);
    return myBoolean;
  }

  static deleteUser(userName: string): boolean {
    const index = users.findIndex(user => {
      return user.name === userName;
    });
    if (index) {
      users.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }
  static getAllUsers(): Array<IGameUser> {
    return users;
  }
  static getUser(userName: string): IGameUser {
    const user = users.find(user => user.name === userName);
    if (user) return user;
    else throw new Error("Could not find user");
  }
  static checkUser(userName: string, password: string): boolean {
    /*Use bcrypts compare method */
    // Load hash from your password DB.
    let myBoolean = false;
    const checkPassword = async (userName: string, password: string) => {
      await bcrypt.compare(
        password,
        this.getUser(userName).password,
        (err, res) => {
          if (err) {
            debug(`Error Checking Password: ${err}`);
          } else if (res) {
            myBoolean = true;
          } else {
            debug(`Password for ${userName} was incorrect`);
          }
        }
      );
    };
    checkPassword(userName, password);
    return myBoolean;
  }
}
