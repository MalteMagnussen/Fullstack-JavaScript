const express = require("express");
const app = express();
// import gju from "geojson-utils";
const gju = require("geojson-utils");
const { gameArea, players } = require("./gameData");
app.get("/", (req, res) => res.send("Geo Demo!"));
app.listen(3000, () => console.log("Example app listening on port 3000!"));
// const { gameArea, players } = require("./gameData")

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
  const result = players.filter(e =>
    gju.geometryWithinRadius(e.geometry, center, rad)
  );

  //In normal for-loop; i is just an index
  //   for (let i in players) {
  //     if (gju.geometryWithinRadius(players[i].geometry, center, rad)) {
  //       result.push(players[i]);
  //     }
  //   }

  res.send(result);
});
