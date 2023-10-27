import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 2)
          throw new Error("Invalid username, must be at least 2 characters.");
      },
    },
    title: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 2)
          throw new Error("Invalid task, must be at least 2 characters.");
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
    date: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 2)
          throw new Error("Invalid task, must be at least 2 characters.");
      },
    },
    flagged: {
      type: Boolean,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  { collection: "tasks_list" }
);

export default mongoose.model("Tasks", TaskSchema);
