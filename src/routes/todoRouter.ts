import { Router } from "express";
import { getTodos, postTodos } from "../controller/todoController";

export const todoRouter: Router = Router();

todoRouter.get("/", getTodos).post("/", postTodos);