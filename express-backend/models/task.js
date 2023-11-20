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
                        "Invalid user, must be at least 2 characters."
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
                        "Invalid title, must be at least 2 characters."
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
        category: {
            type: String,
            required: false,
            trim: true,
            enum: ["Personal", "Sports", "School", "Work"],
        },
        date: {
            type: Date,
            required: true,
            trim: true,
        },
        flagged: {
            type: Boolean,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
    },
    { collection: "tasks_list" }
);

export default mongoose.model("Task", TaskSchema);
