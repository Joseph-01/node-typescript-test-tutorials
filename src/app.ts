import express, {Express} from "express";
import userRouter from "./routes/userRouter";

const server: Express = express()

export default function () {
  server.use(express.json())
  server.use("/users", userRouter)
  return server;
}