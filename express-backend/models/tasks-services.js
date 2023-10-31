import mongoose from "mongoose";
import dotenv from "dotenv";
import TaskSchema from "./tasks.js";

// Configure environment variables
dotenv.config();

// uncomment the following line to view mongoose debug messages
mongoose.set("debug", true);
mongoose
  .connect(
    "mongodb+srv://" +
      process.env.MONGO_USER +
      ":" +
      process.env.MONGO_PWD +
      "@" +
      process.env.MONGO_CLUSTER +
      "/" +
      process.env.MONGO_DB,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .catch((error) => console.log(error));

const db = mongoose.connection;

// Listen for the 'open' event, which indicates that the connection is open
// db.once("open", () => {
//   console.log("Connected to the MongoDB database:", TaskSchema.db.name);
// });

async function getTasks(date, flagged, status) {
  let result;
  if (date !== undefined) {
    result = await findTaskByDate(date);
  } else if (flagged !== undefined) {
    console.log(typeof flagged);
    result = await findTaskByFlag(flagged);
  } else if (status !== undefined) {
    result = await findTaskByStatus(status);
  } else {
    result = await TaskSchema.find();
  }
  return result;
}

async function addTask(task) {
  try {
    const taskToAdd = new TaskSchema(task);
    const savedTask = await taskToAdd.save();
    return savedTask;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function findTaskByDate(date) {
  return await TaskSchema.find({ date: date });
}

async function findTaskByFlag(flagged) {
  return await TaskSchema.find({ flagged: flagged });
}

async function findTaskByStatus(status) {
  return await TaskSchema.find({ status: status });
}

export default {
  getTasks,
  addTask,
  findTaskByDate,
};
