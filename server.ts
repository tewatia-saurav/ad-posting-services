import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./src/routes/userRoutes";
import adsRouter from "./src/routes/adRoutes";
import path from "path";
dotenv.config();

const app = express();

const startServer = async () => {
  try {
    await connectDB();
    app.use(express.static(path.resolve(__dirname, "./client/build")));
    app.use(express.json());
    app.use(cors());
    app.use("/api/user/", userRouter);
    app.use("/api/ads/", adsRouter);
    const port = process.env.PORT || 4000;
    app.get("*", function (request, response) {
      response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
    });
    app.listen(port, () => {
      console.log(`Listen at http://localhost:${port}`);
    });
  } catch (err) {
    console.log("Something went wrong..!!");
  }
};

const connectDB = async () => {
  let dbUrl = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.om1wd.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;

  let mongoParams = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  };
  try {
    await mongoose.connect(dbUrl, mongoParams);
    console.log("Connected to database..!!");
  } catch (err) {
    console.log("Error : ", err);
  }
};

startServer();
