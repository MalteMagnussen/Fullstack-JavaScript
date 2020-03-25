const express = require("express");
const app = express();
const gju = require("geojson-utils");
const { gameArea, players } = require("./gameData");
app.get("/", (req, res) => res.send("Geo Demo!"));
app.listen(3000, () => console.log("Example app listening on port 3000!"));
