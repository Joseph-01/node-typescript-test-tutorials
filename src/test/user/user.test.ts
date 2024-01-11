import request from "supertest";
import myServer from "../../app";
import { start, stop } from "../config";

const app = myServer();

beforeAll(async () => {
  await start();
});


afterAll(async () => {
  await stop();
});

describe("test for all user endpoint", () => {
  it("should be able to create new user", async () => {
    await request(app)
      .post("/users")
      .set("Accept", "application/json")
      .send({
        username: "fake_username",
        password: "fake_password",
        email: "fake@gmail.com",
      })
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.statusCode).toBe(201);
      });
  });

  const id = "636hsxjskxwu2828shj";
  it("should be return 400 if id not given", async () => {
    await request(app)
      .get(`/users/:${id}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });
});
