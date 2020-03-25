const express = require("express");
const app = express();
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
    {
      type: "Polygon",
      coordinates: [
        [
          [0, 0],
          [6, 0],
          [6, 6],
          [0, 6]
        ]
      ]
    }
  );

  if (userInArea) {
    return {
      status: true,
      msg: "Point was inside the tested polygon"
    };
  } else {
    return {
      status: false,
      msg: "Point was NOT inside tested polygon"
    };
  }
});
