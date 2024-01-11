import { Router } from "express";
import { createUser, getOneUser, getUsers } from "../controllers/userController";

const userRouter: Router = Router()

userRouter.post("/", createUser);
userRouter.get("/", getUsers);
userRouter.get("/:id", getOneUser)


export default userRouter;