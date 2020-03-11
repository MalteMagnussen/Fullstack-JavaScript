// app.server.js

const express = require("express");
const app = express();
const converter = require("./converter");

app.get("/rgbToHex", (req, res) => {
  const red = parseInt(req.query.red, 10);
  const green = parseInt(req.query.green, 10);
  const blue = parseInt(req.query.blue, 10);
  const hex = converter.rgbToHex(red, green, blue);
  res.send(hex);
});

app.get("/hexToRgb", (req, res) => {
  const hex = req.query.hex;
  const rgb = converter.hexToRgb(hex);
  res.send(JSON.stringify(rgb));
});

console.log("Server listening on http://localhost:3000......");
app.listen(3000);
