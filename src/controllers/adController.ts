import Ad from "./../models/adModel";
import jwt from "jsonwebtoken";

export const getAllAds = async (req: any, res: any) => {
  try {
    let ads = await Ad.find({});

    res.status(200).send({ status: "success", data: ads });
  } catch (err: any) {
    res.status(400).send({ status: "fail", message: err.message });
  }
};

export const deleteAdById = async (req: any, res: any) => {
  try {
    let ad = await Ad.findByIdAndDelete(req.body._id);

    res
      .status(200)
      .send({ status: "success", message: "Ad deleted successfully" });
  } catch (err: any) {
    res.status(400).send({ status: "fail", message: err.message });
  }
};

export const getAllAdsByUser = async (req: any, res: any) => {
  try {
    const user: any = await jwt.decode(req.body.token);
    let ads = await Ad.find({ user: user?.email });

    res.status(200).send({ status: "success", data: ads });
  } catch (err: any) {
    res.status(400).send({ status: "fail", message: err.message });
  }
};
export const getAllAdsByUserCategory = async (req: any, res: any) => {
  try {
    const user: any = await jwt.decode(req.body.token);
    let ads = await Ad.find({ user: user?.email, category: req.body.category });

    res.status(200).send({ status: "success", data: ads });
  } catch (err: any) {
    res.status(400).send({ status: "fail", message: err.message });
  }
};
export const getAllAdsByCategory = async (req: any, res: any) => {
  try {
    let ads = await Ad.find({ category: req.body.category });
    res.status(200).send({ status: "success", data: ads });
  } catch (err: any) {
    res.status(400).send({ status: "fail", message: err.message });
  }
};

export const createNewAd = async (req: any, res: any) => {
  try {
    const user: any = await jwt.decode(req.body.token);
    let ad = new Ad({
      ...req.body.ad,
      user: user.email,
    });
    ad.save((err: any) => {
      if (err) {
        res.status(400).send({ status: "fail", message: err });
      } else {
        res.status(201).send({ status: "pass", message: "ad created" });
      }
    });
  } catch (err: any) {
    res.status(400).send({ status: "fail", messages: err.message });
  }
};
