const express = require("express");
const app = express();
// import gju from "geojson-utils";
const gju = require("geojson-utils");
const { gameArea, players } = require("./gameData");
app.get("/", (req, res) => res.send("Geo Demo!"));
app.listen(3000, () => console.log("Example app listening on port 3000!"));
// const { gameArea, players } = require("./gameData")

/**
 * Find out if point is inside game area
 */
app.get("/geoapi/isuserinarea/:lon/:lat", (req, res) => {
  const lon = req.params["lon"];
  const lat = req.params["lat"];

  const userInArea = gju.pointInPolygon(
    { type: "Point", coordinates: [lon, lat] },
    gameArea
  );

  if (userInArea) {
    // TEST: http://localhost:3000/geoapi/isuserinarea/12.561578750610352/55.779758908094266
    res.send({
      status: true,
      msg: "Point was inside the tested polygon"
    });
  } else {
    // TEST: http://localhost:3000/geoapi/isuserinarea/10/10
    res.send({
      status: false,
      msg: "Point was NOT inside tested polygon"
    });
  }
});

/**
 * Find all players near point. "Near" is defined by the radius.
 */
app.get("/geoapi/findNearbyPlayers/:lon/:lat/:rad", (req, res) => {
  const lon = req.params.lon;
  const lat = req.params.lat;
  const rad = req.params.rad;

  //Creating proper geo-json format
  let center = {
    type: "Point",
    coordinates: [lon, lat]
  };

  //Brug lambda :))
  const result = players.filter(player =>
    gju.geometryWithinRadius(player.geometry, center, rad)
  );

  //In normal for-loop; i is just an index
  //   for (let i in players) {
  //     if (gju.geometryWithinRadius(players[i].geometry, center, rad)) {
  //       result.push(players[i]);
  //     }
  //   }

  res.send(result);
});

/**
 * Find distance between point and a player
 */
app.get("/geoapi/distanceToUser/:lon/:lat/:username", (req, res) => {
  const point = {
    type: "Point",
    coordinates: [req.params.lon, req.params.lat]
  };
  const username = req.params.username;
  const player = players.find(player => player.properties.name === username);
  if (player) {
    const distance = gju.pointDistance(point, {
      type: "Point",
      coordinates: player.geometry.coordinates
    });
    res.send({
      distance,
      to: username
    });
  } else {
    res.status(404).send({
      msg: "User not found"
    });
  }
});
