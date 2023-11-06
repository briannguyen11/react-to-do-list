import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
// const ObjectId = Schema.ObjectId;
// eslint-disable-next-line no-unused-vars
import Task from "./task";

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            validate(value) {
                if (value.length < 2)
                    throw new Error(
                        "Invalid username, must be at least 2 characters."
                    );
            },
        },
        password: {
            type: String,
            required: true,
            trim: true,
            validate(value) {
                if (value.length < 2)
                    throw new Error(
                        "Invalid task, must be at least 2 characters."
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
