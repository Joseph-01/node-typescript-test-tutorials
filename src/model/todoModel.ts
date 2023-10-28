import mongoose, { Schema, Document} from "mongoose";

const TodoSchema: Schema = new mongoose.Schema({
    task: String,
    completed: Boolean
})

export default mongoose.model("Todos", TodoSchema);