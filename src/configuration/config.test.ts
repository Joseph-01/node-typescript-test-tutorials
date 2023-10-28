import mongoose from "mongoose";
import { start, stop } from "./test-config";

beforeAll(async () => {
  await start();
});

afterAll(async () => {
  await stop();
});

describe("Mongoose Test", () => {
  it("should save a document to the in-memory database", async () => {
    const User = mongoose.model("User", new mongoose.Schema({ name: String }));

    const user = new User({ name: "John Doe" });
    await user.save();

    const foundUser = await User.findOne({ name: "John Doe" });

    expect(foundUser).toBeTruthy();
    expect(foundUser.name).toBe("John Doe");
  });
});
