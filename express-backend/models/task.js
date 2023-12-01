import mongoose from "mongoose";
const Schema = mongoose.Schema;
// eslint-disable-next-line no-unused-vars
const ObjectId = Schema.ObjectId;

const TaskSchema = new Schema(
    {
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
            required: true,
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
            enum: ["Not Started", "In Progress", "Done"],
        },
    },
    { collection: "tasks_list" }
);

export default mongoose.model("Task", TaskSchema);
