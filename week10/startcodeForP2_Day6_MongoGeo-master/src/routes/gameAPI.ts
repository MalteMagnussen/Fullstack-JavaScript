import express from "express";
import gameFacade from "../facades/gameFacade";
const router = express.Router();
import { ApiError } from "../errors/apiError";

//import * as mongo from "mongodb"
import setup from "../config/setupDB";
import UserFacade from "../facades/userFacadeWithDB";

(async function setupDB() {
  const client = await setup();
  gameFacade.setDatabase(client);
})();

router.post("/nearbyplayers", async function(req, res, next) {
  /*
  {"userName":"team1", "password":"secret", "lat":3, "lon": 5,"distance": 3}
 */
  try {
    //Todo call your facade method
    // throw new Error("Not Yet Implemented")
    const nearbyPlayers = await gameFacade.nearbyPlayers(
      req.body.userName,
      req.body.password,
      req.body.lon,
      req.body.lat,
      req.body.distance
    );
    res.send(nearbyPlayers);
  } catch (err) {
    next(err);
  }
});
router.post("/getPostIfReached", async function(req, res, next) {
  throw new Error("Not yet implemented");
});

module.exports = router;