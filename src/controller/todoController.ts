import { Request, Response } from "express";

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

export const postTodos = (req: Request, res: Response) => {
    const newTodo = {
        "id": 3,
        "task": "clean",
        "completed": false
    }

    const data: object = newTodo;
    res.status(201).json(data);
}