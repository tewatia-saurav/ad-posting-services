"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var adController_1 = require("../controllers/adController");
var adsRouter = express_1.default.Router();
adsRouter.get("/getAll", adController_1.getAllAds);
adsRouter.post("/create", adController_1.createNewAd);
adsRouter.post("/delete", adController_1.deleteAdById);
adsRouter.post("/getByCategory", adController_1.getAllAdsByCategory);
adsRouter.post("/getByUser", adController_1.getAllAdsByUser);
adsRouter.post("/getByUserCategory", adController_1.getAllAdsByUserCategory);
exports.default = adsRouter;
