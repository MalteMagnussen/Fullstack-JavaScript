"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
require("dotenv").config({ path: path.join(process.cwd(), ".env") });
const bcrypt_async_helper_1 = require("../utils/bcrypt-async-helper");
const apiError_1 = require("../errors/apiError");
let userCollection;
class UserFacade {
    static setDatabase(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbName = process.env.DB_NAME;
            if (!dbName) {
                throw new Error("Database name not provided");
            }
            try {
                if (!client.isConnected()) {
                    yield client.connect();
                }
                userCollection = client.db(dbName).collection("users");
                yield userCollection.createIndex({ userName: 1 }, { unique: true });
                return client.db(dbName);
            }
            catch (err) {
                console.error("Could not create connect", err);
            }
        });
    }
    static addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const hash = yield bcrypt_async_helper_1.bryptAsync(user.password);
            let newUser = Object.assign(Object.assign({}, user), { password: hash });
            try {
                const result = yield userCollection.insertOne(newUser);
                return "User was added";
            }
            catch (err) {
                if (err.code === 11000) {
                    throw new apiError_1.ApiError("This userName is already taken", 400);
                }
                //THis should probably be logged
                throw new apiError_1.ApiError(err.errmsg, 400);
            }
        });
    }
    static deleteUser(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield userCollection.deleteOne({ userName });
            if (status.deletedCount === 1) {
                return "User was deleted";
            }
            else
                throw new apiError_1.ApiError("Requested delete could not be performed", 400);
        });
    }
    //static async getAllUsers(): Promise<Array<IGameUser>> {
    static getAllUsers(proj) {
        return __awaiter(this, void 0, void 0, function* () {
            const all = userCollection.find({}, { projection: proj });
            return all.toArray();
        });
    }
    static getUser(userName, proj) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userCollection.findOne({ userName }, proj);
            if (!user) {
                throw new apiError_1.ApiError("User not found", 404);
            }
            return user;
        });
    }
    static checkUser(userName, password) {
        return __awaiter(this, void 0, void 0, function* () {
            //   let userPassword = "";
            //   try {
            const user = yield UserFacade.getUser(userName);
            const userPassword = user.password;
            //   } catch (err) {}
            //   const status = await bryptCheckAsync(password, userPassword);
            //   return status;
            // }
            var bcrypt = require("bcryptjs");
            return bcrypt.compare(password, userPassword);
        });
    }
}
exports.default = UserFacade;
//test();
//# sourceMappingURL=userFacadeWithDB.js.map