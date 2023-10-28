import request from "supertest";
import myApp from "./app";

const app = myApp()

describe("wow", () => {
  it("/api test route", async () => {
    const response = await request(app)
      .get("/")
      .expect(200);
    expect(response.body).toEqual({ msg: "hello" });
  });

  it("post /todos", async () => {
    const result = await request(app).post("/todos");
    expect(result.statusCode).toBe(201);
    expect(result.body).toBeDefined();
    expect(result.body).toEqual(
      expect.objectContaining({
        id: 3,
        task: "clean",
        completed: false,
      })
    );
  });

  it("/api/todos", async () => {
    const response = await request(app)
      .get("/todos")
      .expect(200);
    expect(response.body).toEqual([
      {
        id: 1,
        task: "sweep",
        completed: false,
      },
      {
        id: 2,
        task: "wash",
        completed: true,
      },
    ]);
  });
});
