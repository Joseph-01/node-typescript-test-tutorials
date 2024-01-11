import mongoose, {Schema} from "mongoose";

export interface UserInterface {
    username: string,
    password: string,
    email: string,
  }

const UserSchema: Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

export default mongoose.model("User", UserSchema);
