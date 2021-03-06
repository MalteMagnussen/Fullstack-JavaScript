"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gju = require("geojson-utils");
const { gameArea, players } = require("./gameData");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/*
 Create a new polygon meant to be used on clients by React Native's MapView which
 requres an object as the one we create below
 NOTE --> how we swap longitude, latitude values
*/
const polygonForClient = {
    coordinates: gameArea.coordinates[0].map((point) => {
        return { latitude: point[1], longitude: point[0] };
    }),
};
//Returns a polygon, representing the gameArea
router.get("/gamearea", (req, res) => {
    res.json(polygonForClient);
});
/**
 * Returns whether you're inside area yourself.
 */
router.get("/isuserinarea/:lon/:lat", function (req, res) {
    const isInside = gju.pointInPolygon({
        type: "Point",
        coordinates: [req.params.lon, req.params.lat],
    }, gameArea);
    const msg = isInside
        ? "Point was inside the tested polygon"
        : "Point was NOT inside tested polygon";
    res.json({
        status: isInside,
        msg,
    });
});
/**
 * Returns players within radius.
 */
router.get("/findNearbyPlayers/:lon/:lat/:rad", function (req, res) {
    const lon = Number(req.params.lon);
    const lat = Number(req.params.lat);
    const rad = Number(req.params.rad);
    const point = { type: "Point", coordinates: [lon, lat] };
    let result = [];
    players.forEach((player) => {
        if (gju.geometryWithinRadius(player.geometry, point, rad)) {
            result.push(player);
        }
    });
    res.json(result);
});
router.get("/distanceToUser/:lon/:lat/:username", function (req, res) {
    const { lon, lat, username } = req.params;
    const point = { type: "Point", coordinates: [Number(lon), Number(lat)] };
    const user = players.find((player) => {
        return player.properties.name === username;
    });
    if (!user) {
        res.status(404);
        return res.json({ msg: "User not found" });
    }
    const distance = gju.pointDistance(point, user.geometry);
    res.json({ distance, to: username });
});
module.exports = router;
//# sourceMappingURL=geoAPI.js.map