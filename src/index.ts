import myServer from "./app";
import startConnection from "./config";
import dotenv from "dotenv";
dotenv.config();

const {PORT} = process.env
const app = myServer();

startConnection()
app.listen(PORT, () => {
  console.log(`All running`);
});
