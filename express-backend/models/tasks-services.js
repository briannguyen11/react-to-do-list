import mongoose from "mongoose";
import dotenv from "dotenv"
import TaskSchema from "./tasks.js";

// Configure environment variables
dotenv.config();

// uncomment the following line to view mongoose debug messages
mongoose.set("debug", true);
mongoose
  .connect("mongodb+srv://" + process.env.MONGO_USER + ":" + process.env.MONGO_PWD + "@" + process.env.MONGO_CLUSTER + "/" + process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

async function getTasks(user, date, flagged, status) {
  let result;
  if (user !== undefined) {
    result = await findTaskByUser(user);
  }
  else if (date !== undefined) {
    result = await findTaskByDate(date);
  }
  else if (flagged !== undefined) {
    result = await findTaskByFlag(flagged);
  }
  else if (status !== undefined) {
    result = await findTaskByStatus(status);
  }
  else {
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

async function findTaskByUser(user) {
  return await TaskSchema.find({ user: user });
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
