interface IGameUser {
  name: string;
  userName: string;
  password: string;
  role: string;
}

const users: Array<IGameUser> = [];
class UserFacade {
  static addUser(user: IGameUser): boolean {
    /*Info: Import bcrypt and (npm install bcrypt) and hash before you store */
    throw Error("Not Implemented");
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
    throw new Error("Not yet implemented");
  }
}
