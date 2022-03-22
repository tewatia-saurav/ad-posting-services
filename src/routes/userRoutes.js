"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userController_1 = require("../controllers/userController");
var userRouter = express_1.default.Router();
userRouter.post("/register", userController_1.register);
userRouter.post("/login", userController_1.login);
userRouter.post("/update", userController_1.update);
exports.default = userRouter;
