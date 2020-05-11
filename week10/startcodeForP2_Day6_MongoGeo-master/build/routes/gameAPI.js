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
const express_1 = __importDefault(require("express"));
const gameFacade_1 = __importDefault(require("../facades/gameFacade"));
const router = express_1.default.Router();
//import * as mongo from "mongodb"
const setupDB_1 = __importDefault(require("../config/setupDB"));
(function setupDB() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield setupDB_1.default();
        gameFacade_1.default.setDatabase(client);
    });
})();
router.post("/updatePosition", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const position = yield gameFacade_1.default.updatePositionSimple(req.body.userName, req.body.lon, req.body.lat);
        res.send(position);
    }
    catch (err) {
        next(err);
    }
}));
router.post("/nearbyplayers", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        /*
        {"userName":"team1", "password":"secret", "lat":3, "lon": 5,"distance": 3}
       */
        try {
            const nearbyPlayers = yield gameFacade_1.default.nearbyPlayers(req.body.userName, req.body.password, req.body.lon, req.body.lat, req.body.distance);
            res.send(nearbyPlayers);
        }
        catch (err) {
            next(err);
        }
    });
});
router.post("/getPostIfReached", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        /*
      Request JSON:
        {"postId":"post1", "lat":3, "lon": 5}
      Response JSON (if found):
        {"postId":"post1", "task": "2+5", isUrl:false}
      Response JSON (if not reached):
        {message: "Post not reached", code: 400} (StatusCode = 400)
        */
        try {
            const result = yield gameFacade_1.default.getPostIfReached(req.body.postId, req.body.lon, req.body.lat);
            res.send(result);
        }
        catch (err) {
            next(err);
        }
    });
});
module.exports = router;
//# sourceMappingURL=gameAPI.js.map