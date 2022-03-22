import express from "express";
import { login, register, update } from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/update", update);


export default userRouter;
