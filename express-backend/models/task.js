import mongoose from "mongoose";
const Schema = mongoose.Schema;
// eslint-disable-next-line no-unused-vars
const ObjectId = Schema.ObjectId;

const TaskSchema = new Schema(
    {
        user: {
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
        title: {
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
        description: {
            type: String,
            required: true,
            trim: true,
            validate(value) {
                if (value.length < 5)
                    throw new Error(
                        "Invalid description, must be at least 5 characters."
                    );
            },
        },
        categories: {
            type: [String],
            required: true,
            trim: true,
        },
        date: {
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
        flagged: {
            type: Boolean,
            required: true,
        },
        completed: {
            type: Boolean,
            required: true,
        },
    },
    { collection: "tasks_list" }
);

export default mongoose.model("Task", TaskSchema);
