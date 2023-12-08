import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
// const ObjectId = Schema.ObjectId;
// eslint-disable-next-line no-unused-vars
import Task from "./task.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // A simple email validation regex

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            validate(value) {
                if (!emailRegex.test(value)) {
                    throw new Error("Invalid email format.");
                }
            },
        },
        password: {
            type: String,
            required: true,
            trim: true,
            validate(value) {
                if (value.length < 2)
                    throw new Error(
                        "Invalid password, must be at least 2 characters."
                    );
            },
        },
        tasks: [
            {
                type: ObjectId,
                ref: "Task",
                required: false,
                trim: true,
            },
        ],
    },
    { collection: "user_list" }
);

export default mongoose.model("User", UserSchema);
