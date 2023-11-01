import mongoose from "mongoose";
import dotenv from "dotenv";
import TaskSchema from "./tasks.js";

// Configure environment variables
dotenv.config();

// uncomment the following line to view mongoose debug messages
mongoose.set("debug", true);
mongoose
    .connect(
        // eslint-disable-next-line no-undef
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .catch((error) => console.log(error));

async function getTasks(user, date, flagged, completed) {
    let result;
    if (user !== undefined) {
        if (date !== undefined) {
            result = await findTaskByUserAndDate(user, date);
        } else if (flagged !== undefined) {
            result = await findTaskByUserAndFlag(user, flagged);
        } else if (completed !== undefined) {
            result = await findTaskByUserAndStatus(user, completed);
        } else {
            result = await findTaskByUser(user);
        }
    } else if (date !== undefined) {
        result = await findTaskByDate(date);
    } else if (flagged !== undefined) {
        result = await findTaskByFlag(flagged);
    } else if (completed !== undefined) {
        result = await findTaskByStatus(completed);
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

// Filter functions
async function findTaskByUser(user) {
    return await TaskSchema.find({ user });
}

async function findTaskByUserAndDate(user, date) {
    return await TaskSchema.find({ user, date });
}

async function findTaskByUserAndFlag(user, flag) {
    return await TaskSchema.find({ user }, { flag });
}

async function findTaskByUserAndStatus(user, completed) {
    return await TaskSchema.find({ user, completed });
}

async function findTaskByDate(date) {
    return await TaskSchema.find({ date });
}

async function findTaskByFlag(flagged) {
    return await TaskSchema.find({ flagged });
}

async function findTaskByStatus(completed) {
    return await TaskSchema.find({ completed });
}

export default {
    getTasks,
    addTask,
};