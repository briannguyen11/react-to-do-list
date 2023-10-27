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

async function getTasks() {
  let result;
  result = await TaskSchema.find();
  console.log('Model is using database: ', TaskSchema.db.name);
  return result;
}

export default {
  getTasks,
};
