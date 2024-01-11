import { Request, Response } from "express";
import User from "../model/userModel";
import mongoose from "mongoose";

export const createUser = async (
  req: Request,
  res: Response
): Promise<object> => {
  try {
    const user = req.body;
    const checkUser = await User.findOne({ email: user.email });
    if (checkUser) {
      res.status(400);
      return res.json(`Already exist`);
    } else {
      const newUser = new User(user);
      await newUser.save();
      res.status(201);
      return res.json(newUser);
    }
  } catch (error) {
    res.status(500);
    return res.json("Something went wrong");
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const user = await User.find();
    res.status(200);
    return res.json(user);
  } catch (error) {
    res.status(500);
    return res.json("Something went wrong");
  }
};

export const getOneUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!id) {
      res.status(400);
      return res.json("Please input your id");
    }

    if (!mongoose.isValidObjectId(id)) {
      res.status(400);
      return res.json("Invalid id");
    }

    const user = await User.findById(id);

    if (!user) {
      res.status(404);
      return res.json("User not found");
    }

    res.status(200);
    return res.json(user);
  } catch (error) {
    console.error("Error in getOneUser:", error); // Log the error for debugging
    res.status(500);
    return res.json("Something went wrong");
  }
};
