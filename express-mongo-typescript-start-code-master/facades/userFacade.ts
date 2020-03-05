const bcrypt = require("bcryptjs");

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
    const saltLength = 10;
    let myBoolean = false;
    // TODO WRAP IN PROMISE
    bcrypt.hash(user.password, saltLength, (err, hash) => {
      if (err) {
        // TODO HANDLE ERROR
        // REJECT ERROR
      } else {
        user.password = hash;
        users.push(user);
        myBoolean = true;
      }
    });
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
    return users.find(user => user.name === userName);
  }
  static checkUser(userName: string, password: string): boolean {
    /*Use bcrypts compare method */
    // Load hash from your password DB.

    let myBoolean = false;
    // TODO WRAP IN PROMISE
    bcrypt.compare(password, this.getUser(userName).password, (err, res) => {
      if (err) {
        // TODO HANDLE ERROR
        // TODO REJECT ERROR
      } else {
        // res === true
        myBoolean = res;
      }
    });
    return myBoolean;
  }
}
