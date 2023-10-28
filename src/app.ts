import express, { Request, Response } from "express";
import { todoRouter } from "./routes/todoRouter";
// import config from "./configuration/test-config";

const app: express.Application = express();

export default function () {
  app.use("/todos", todoRouter);

  app.get("/", async(req: Request, res: Response) => {
    res.json({"msg": "hello"})
  });

  return app;
}
