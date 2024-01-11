import {
  createUser,
  getOneUser,
  getUsers,
} from "../../controllers/userController";
import { Request, Response } from "express";
import User from "../../model/userModel";
import mongoose from "mongoose";

jest.mock("../../model/userModel");

const request = {
  body: {
    username: "fake_username",
    password: "fake_password",
    email: "fake@email.com",
  },
  params: { id: "636hsxjskxwu2828shj" },
} as any;

const response = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as any;

beforeEach(async () => {
  await response.json.mockReset();
  await response.status.mockReset();
});

describe("unit test for create new user", () => {
  it("test if email already exist, and return already exist", async () => {
    jest
      .spyOn(User, "findOne")
      .mockReturnValue({ email: "fake@email.com" } as any);
    await createUser(request, response);
    expect(User.findOne).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledWith(400);
  });

  it("test if email is new, and creates new user", async () => {
    jest.spyOn(User, "findOne").mockResolvedValueOnce(null);
    jest.spyOn(User.prototype, "save");
    await createUser(request, response);
    const user = new User(request.body);
    expect(user.save).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith(expect.any(Object));
  });
});

describe("test get all user method", () => {
  it("test get all users function", async () => {
    jest.spyOn(User, "find").mockReturnValueOnce(request.body);
    await getUsers(request, response);
    expect(User.find).toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toBeDefined();
    expect(response.json).toHaveBeenCalledTimes(1);
  });
});

describe("unit test find one user method", () => {
  it("should return 404 if user is not found", async () => {
    // Mocking the isValidObjectId to return true, simulating a valid ObjectId
    jest.spyOn(mongoose, "isValidObjectId").mockReturnValue(true);

    // Mocking the findById method to simulate that the user is not found
    jest.spyOn(User, "findById").mockResolvedValueOnce(null);

    await getOneUser(request, response);

    // Add expectations based on your actual implementation
    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.json).toHaveBeenCalledWith("User not found");
  });

  it("should return 400 when id is not passed", async () => {
    jest.replaceProperty(request.params, "id", null);
    await getOneUser(request, response);
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith("Please input your id");
  });
});
