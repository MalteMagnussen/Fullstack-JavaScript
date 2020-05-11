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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
require("dotenv").config({ path: path.join(process.cwd(), ".env") });
const apiError_1 = require("../errors/apiError");
const userFacadeWithDB_1 = __importDefault(require("./userFacadeWithDB"));
const collectionNames_1 = require("../config/collectionNames");
let positionCollection;
let postCollection;
// How many seconds, before the position is considered outdated.
const EXPIRES_AFTER = 30;
class GameFacade {
    /**
     * Set the Database to connect to.
     * The Test Database if testing, otherwise the "Production" Database.
     * @param client The Client you wish to connect to.
     */
    static setDatabase(client) {
        return __awaiter(this, void 0, void 0, function* () {
            // Pull the name of the Database from the .env file.
            // Node uses the .env file as its environment.
            const dbName = process.env.DB_NAME;
            // Make sure we have a Database name.
            if (!dbName) {
                throw new Error("Database name not provided");
            }
            //This facade uses the UserFacade, so set it up with the right client
            yield userFacadeWithDB_1.default.setDatabase(client);
            try {
                // Make sure we have a connection. Wait until we have the connection.
                if (!client.isConnected()) {
                    yield client.connect();
                }
                // Get the Position Collection for use.
                positionCollection = client
                    .db(dbName)
                    .collection(collectionNames_1.POSITION_COLLECTION_NAME);
                // Creates expiresAfterSeconds index on lastUpdated
                yield positionCollection.createIndex({ lastUpdated: 1 }, { expireAfterSeconds: EXPIRES_AFTER });
                // Creates 2dsphere index on location
                yield positionCollection.createIndex({ location: "2dsphere" });
                // Do the same as above, but for the post collection (collection == table basically)
                postCollection = client.db(dbName).collection(collectionNames_1.POST_COLLECTION_NAME);
                yield postCollection.createIndex({ location: "2dsphere" });
                // Return a proper client for use.
                return client.db(dbName);
            }
            catch (err) {
                // We shouldn't console log tbh. Should use the Debug tool instead.
                console.error("Could not connect", err);
            }
        });
    }
    /**
     * Find Nearby Players
     * @param userName Username of the person who you want to find other nearby players around (yourself)
     * @param password Your password
     * @param longitude
     * @param latitude
     * @param distance Radius of the circle around you, you wish to find the people inside of.
     */
    static nearbyPlayers(userName, password, longitude, latitude, distance) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            try {
                // Step-1. Find the user, and if found continue
                user = yield userFacadeWithDB_1.default.getUser(userName);
            }
            catch (err) {
                throw new apiError_1.ApiError("wrong username or password", 403);
            }
            try {
                //If loggedin update (or create if this is the first login) his position
                if (!(yield userFacadeWithDB_1.default.checkUser(userName, password)))
                    throw new apiError_1.ApiError("wrong username or password", 403);
                const point = { type: "Point", coordinates: [longitude, latitude] };
                const found = yield positionCollection.findOneAndUpdate({ userName }, //Add what we are searching for (the userName in a Position Document)
                {
                    $set: {
                        userName,
                        name: user.name,
                        lastUpdated: new Date(),
                        location: point,
                    },
                }, // upsert creates the position, if it doesnt exist yet.
                { upsert: true, returnOriginal: false });
                /*
                By now we have updated (or created) the callers position-document
                Next step is to see if we can find any nearby players
                */
                const nearbyPlayers = yield GameFacade.findNearbyPlayers(userName, point, distance);
                //console.log(nearbyPlayers);
                //If anyone found, format acording to requirements
                const formatted = nearbyPlayers.map((player) => {
                    return {
                        userName: player.userName,
                        name: player.name,
                        lat: player.location.coordinates[1],
                        lon: player.location.coordinates[0],
                    };
                });
                return formatted;
            }
            catch (err) {
                throw err;
            }
        });
    }
    /**
     * Help function
     * @param clientUserName
     * @param point
     * @param distance
     */
    static findNearbyPlayers(clientUserName, point, distance) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const location = {
                    $near: {
                        $geometry: point,
                        $maxDistance: distance,
                    },
                };
                const found = yield positionCollection.find({
                    userName: { $ne: clientUserName },
                    location,
                });
                return found.toArray();
            }
            catch (err) {
                throw err;
            }
        });
    }
    /**
     * Get a Post, if you have reached it.
     * @param postId ID of the Post you're at.
     * @param lon Longitude
     * @param lat Latitude
     */
    static getPostIfReached(postId, lon, lat) {
        return __awaiter(this, void 0, void 0, function* () {
            /* EXAMPLE JSON
            Request JSON:
              {"postId":"post1", "lat":3, "lon": 5}
            Response JSON (if found):
              {"postId":"post1", "task": "2+5", isUrl:false}
            Response JSON (if not reached):
              {message: "Post not reached", code: 400} (StatusCode = 400)
            */
            try {
                // Find the post.
                const post = yield postCollection.findOne({
                    _id: postId,
                    location: {
                        $near: {
                            // GeoJSON point
                            $geometry: { type: "Point", coordinates: [lon, lat] },
                            $maxDistance: this.DIST_TO_CENTER,
                        },
                    },
                });
                if (post === null) {
                    throw new apiError_1.ApiError("Post not reached", 400);
                }
                return {
                    postId: post._id,
                    task: post.task.text,
                    isUrl: post.task.isUrl,
                };
            }
            catch (err) {
                throw err;
            }
        });
    }
    /**
     * Adds new posts
     * @param name Of the post
     * @param taskTxt The task to complete for the Team.
     * @param isURL Is the task a link?
     * @param taskSolution Solution for the task.
     * @param lon Longitude
     * @param lat Latitude
     */
    static addPost(name, taskTxt, isURL, taskSolution, lon, lat) {
        return __awaiter(this, void 0, void 0, function* () {
            // GeoJSON point.
            const position = { type: "Point", coordinates: [lon, lat] };
            // insert a post.
            const status = yield postCollection.insertOne({
                _id: name,
                task: { text: taskTxt, isURL },
                taskSolution,
                location: position,
            });
            const newPost = status.ops;
            return newPost;
        });
    }
    /*
    Implement and test a new endpoint which will allow a client to update its location.
    send userName (match document) and longitude, latitude.
    */
    static updatePositionSimple(userName, lon, lat) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const found = yield positionCollection.findOneAndUpdate({ userName }, {
                    $set: {
                        lastUpdated: new Date(),
                        userName,
                        location: { type: "Point", coordinates: [lon, lat] },
                    },
                }, { upsert: true, returnOriginal: false });
                if (found === null) {
                    throw new apiError_1.ApiError("Could not update position", 400);
                }
                const formatted = {
                    lastUpdated: found.value.lastUpdated,
                    userName: found.value.userName,
                    name: found.value.name,
                    location: found.value.location,
                };
                return formatted;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = GameFacade;
// Distance to post, to be considered in range in meters. Is used in the getPostIfReached function.
GameFacade.DIST_TO_CENTER = 10;
//# sourceMappingURL=gameFacade.js.map