import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();
//sudo systemctl start mongod: to start mongodb on terminal

const connectionString: string = process.env.MONGODB || "mongodb://localhost:27017/typescript-node-tuts"

const connect = async (connectionString: string): Promise<object> => {
    try {
      await mongoose.connect(connectionString);
      return;
    } catch (error) {
      return error;
    }
  };

const startConnection = async (listenPort) => {
    try {
        await connect(connectionString);
    } catch (error) {
        return error;
    }
}

export default startConnection;