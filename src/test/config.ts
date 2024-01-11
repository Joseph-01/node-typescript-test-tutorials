import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongod: any;

export const start = async (): Promise<void> => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);
};

export const stop = async () => {
  await mongoose.disconnect();
  await mongod.stop();
};
