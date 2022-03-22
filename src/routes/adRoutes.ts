import express from "express";
import {
  createNewAd,
  deleteAdById,
  getAllAds,
  getAllAdsByCategory,
  getAllAdsByUser,
  getAllAdsByUserCategory,
} from "../controllers/adController";

const adsRouter = express.Router();

adsRouter.get("/getAll", getAllAds);
adsRouter.post("/create", createNewAd);
adsRouter.post("/delete", deleteAdById);
adsRouter.post("/getByCategory", getAllAdsByCategory);
adsRouter.post("/getByUser", getAllAdsByUser);
adsRouter.post("/getByUserCategory", getAllAdsByUserCategory);

export default adsRouter;
