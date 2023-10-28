import { Request, Response } from "express";
import Todos from "../model/todoModel";

const todos  = [
    {
        "id": 1,
        "task": "sweep",
        "completed": false
    },
    {
        "id": 2,
        "task": "wash",
        "completed": true
    }
]

export const getTodos = (req: Request, res: Response) => {
    res.json(todos);
}

export const postTodos = async (req: Request, res: Response) => {
    const newTodo = {
        "task": "clean",
        "completed": false
    }


    const data = new Todos(newTodo);
    await data.save();
    res.status(201).json(data);
}