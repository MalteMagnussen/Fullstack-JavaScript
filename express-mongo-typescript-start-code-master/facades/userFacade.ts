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
    throw Error("Not Implemented");
  }
  static getAllUsers(): Array<IGameUser> {
    throw new Error("Not yet implemented");
  }
  static getUser(userName: string): IGameUser {
    throw new Error("Not yet implemented");
  }
  static checkUser(userName: string, password: string): boolean {
    /*Use bcrypts compare method */
    throw new Error("Not yet implemented");
  }
}
