import request from "supertest";
import myApp from "./app";
import mongoose from "mongoose";
import { start, stop } from "./configuration/test-config";

const app = myApp();
const Todo = mongoose.model(
  "Todo",
  new mongoose.Schema({
    task: String,
    completed: Boolean,
  })
);

beforeAll(async () => {
  await start();
});

afterAll(async () => {
  await stop();
});

describe("wow", () => {
  it("/api test route", async () => {
    const response = await request(app).get("/").expect(200);
    expect(response.body).toEqual({ msg: "hello" });
  });

  it("post /todos", async () => {
    // Create a spy on the save method of the Todo model
    const saveSpy = jest.spyOn(Todo.prototype, "save");

    const todo = new Todo({
      task: "learning",
      completed: false
    });

    const result = await request(app).post("/todos");

    await todo.save();
    // Expect the save method to have been called
    expect(saveSpy).toHaveBeenCalled();

    expect(result.statusCode).toBe(201);
    expect(result.body).toBeDefined();
    expect(result.body).toEqual(
      expect.objectContaining({
        task: "clean",
        completed: false,
      })
    );

    // Restore the original save method to avoid interference with other tests
    saveSpy.mockRestore();
  });

  it("/api/todos", async () => {
    const response = await request(app).get("/todos").expect(200);
  });
});
