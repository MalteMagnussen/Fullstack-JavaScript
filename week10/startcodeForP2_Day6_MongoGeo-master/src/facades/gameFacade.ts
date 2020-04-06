const path = require("path");
require("dotenv").config({ path: path.join(process.cwd(), ".env") });
import IPoint from "../interfaces/Point";
import * as mongo from "mongodb";
import { ApiError } from "../errors/apiError";
import UserFacade from "./userFacadeWithDB";
import IPosition from "../interfaces/Position";
import IPost from "../interfaces/Post";
import { positionCreator } from "../utils/geoUtils";
import {
  POSITION_COLLECTION_NAME,
  POST_COLLECTION_NAME,
} from "../config/collectionNames";

let positionCollection: mongo.Collection;
let postCollection: mongo.Collection;
// How many seconds, before the position is considered outdated.
const EXPIRES_AFTER = 30;

export default class GameFacade {
  // Distance to post, to be considered in range in meters. Is used in the getPostIfReached function.
  static readonly DIST_TO_CENTER = 10;

  /**
   * Set the Database to connect to.
   * The Test Database if testing, otherwise the "Production" Database.
   * @param client The Client you wish to connect to.
   */
  static async setDatabase(client: mongo.MongoClient) {
    // Pull the name of the Database from the .env file.
    // Node uses the .env file as its environment.
    const dbName = process.env.DB_NAME;
    // Make sure we have a Database name.
    if (!dbName) {
      throw new Error("Database name not provided");
    }
    //This facade uses the UserFacade, so set it up with the right client
    await UserFacade.setDatabase(client);

    try {
      // Make sure we have a connection. Wait until we have the connection.
      if (!client.isConnected()) {
        await client.connect();
      }
      // Get the Position Collection for use.
      positionCollection = client
        .db(dbName)
        .collection(POSITION_COLLECTION_NAME);

      // Creates expiresAfterSeconds index on lastUpdated
      await positionCollection.createIndex(
        { lastUpdated: 1 },
        { expireAfterSeconds: EXPIRES_AFTER }
      );
      // Creates 2dsphere index on location
      await positionCollection.createIndex({ location: "2dsphere" });

      // Do the same as above, but for the post collection (collection == table basically)
      postCollection = client.db(dbName).collection(POST_COLLECTION_NAME);
      await postCollection.createIndex({ location: "2dsphere" });
      // Return a proper client for use.
      return client.db(dbName);
    } catch (err) {
      // We shouldn't console log tbh. Should use the Debug tool instead.
      console.error("Could not connect", err);
    }
  }

  static async nearbyPlayers(
    userName: string,
    password: string,
    longitude: number,
    latitude: number,
    distance: number
  ) {
    let user;
    try {
      // Step-1. Find the user, and if found continue
      // Use relevant methods in the user facad>
      user = await UserFacade.getUser(userName);
    } catch (err) {
      throw new ApiError("wrong username or password", 403);
    }

    try {
      //If loggedin update (or create if this is the first login) his position
      // try {
      //   await UserFacade.checkUser(userName, password);
      // } catch (err) {
      //   throw new ApiError("wrong username or password", 403);
      // }
      if (!(await UserFacade.checkUser(userName, password)))
        throw new ApiError("wrong username or password", 403);

      const point = { type: "Point", coordinates: [longitude, latitude] };
      const date = new Date();
      //Todo
      /*It's important you know what to do her. Remember a document for this user does
        not neccesarily exist. If not, you must create it, in not found (see what you can do wit upsert)
        Also remember to set a new timeStamp (use the date create above), since this document should only live for a
        short time */
      const found = await positionCollection.findOneAndUpdate(
        { userName }, //Add what we are searching for (the userName in a Position Document)
        {
          $set: {
            userName,
            name: user.name,
            lastUpdated: date,
            location: point,
          },
        }, // Add what needs to be added here, remember the document might NOT exist yet
        { upsert: true, returnOriginal: false } // Figure out why you probably need to set both of these
      );

      /* TODO 
         By know we have updated (or created) the callers position-document
         Next step is to see if we can find any nearby players, friends or whatever you call them
         */
      const nearbyPlayers = await GameFacade.findNearbyPlayers(
        userName,
        point,
        distance
      );

      //If anyone found,  format acording to requirements
      const formatted = nearbyPlayers.map((player) => {
        return {
          userName: player.userName,
          name: player.name,
          lat: latitude,
          lon: longitude,
          // Complete this, using the requirements
        };
      });
      return formatted;
    } catch (err) {
      throw err;
    }
  }
  static async findNearbyPlayers(
    clientUserName: string,
    point: IPoint,
    distance: number
  ): Promise<Array<IPosition>> {
    try {
      const location = {
        $near: {
          $geometry: point,
          $maxDistance: distance,
        },
      };
      const found = await positionCollection.find({
        userName: { $ne: clientUserName },
        location,
      });
      return found.toArray();
    } catch (err) {
      throw err;
    }
  }

  /**
   * Get a Post, if you have reached it.
   * @param postId ID of the Post you're at.
   * @param lon Longitude
   * @param lat Latitude
   */
  static async getPostIfReached(
    postId: string,
    lon: number,
    lat: number
  ): Promise<any> {
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
      const post: IPost | null = await postCollection.findOne({
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
        throw new ApiError("Post not reached", 400);
      }
      return {
        postId: post._id,
        task: post.task.text,
        isUrl: post.task.isUrl,
      };
    } catch (err) {
      throw err;
    }
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
  static async addPost(
    name: string,
    taskTxt: string,
    isURL: boolean,
    taskSolution: string,
    lon: number,
    lat: number
  ): Promise<IPost> {
    // GeoJSON point.
    const position = { type: "Point", coordinates: [lon, lat] };
    // insert a post.
    const status = await postCollection.insertOne({
      _id: name,
      task: { text: taskTxt, isURL },
      taskSolution,
      location: position,
    });
    const newPost: any = status.ops;
    return newPost as IPost;
  }
}
