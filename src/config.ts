import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectionString: string =
  process.env.MONGO_URI || "mongodb://localhost:27017/typescript-node-tuts";

const connection = async (connectionString: string) => {
  try {
    await mongoose.connect(connectionString);
    return;
  } catch (error) {
    if (error instanceof mongoose.Error)
    return error;
  }
};

const startConnection = async (): Promise<any> => {
  try {
    await connection(connectionString);
  } catch (error) {
    return error;
  }
};

export default startConnection;
