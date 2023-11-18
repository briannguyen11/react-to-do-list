import taskModel from "./task.js";

async function getTasks(user, category, date, flagged, status) {
    let result;
    if (user !== undefined) {
        if (category !== undefined) {
            result = await findTaskByUserAndCategory(user, category);
        } else if (date !== undefined) {
            result = await findTaskByUserAndDate(user, date);
        } else if (flagged !== undefined) {
            result = await findTaskByUserAndFlag(user, flagged);
        } else if (status !== undefined) {
            result = await findTaskByUserAndStatus(user, status);
        } else {
            result = await findTaskByUser(user);
        }
    } else if (date !== undefined) {
        result = await findTaskByDate(date);
    } else if (flagged !== undefined) {
        result = await findTaskByFlag(flagged);
    } else if (status !== undefined) {
        result = await findTaskByStatus(status);
    } else {
        result = await taskModel.find();
    }
    return result;
}

async function findTaskById(id) {
    return await taskModel.findById(id);
}

async function addTask(task) {
    try {
        const taskToAdd = new taskModel(task);
        const savedTask = await taskToAdd.save();
        return savedTask;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function updateTask(id, task) {
    let updatedTask;
    try {
        const oldTask = taskModel.findById(id);

        if (!oldTask) {
            throw new Error("Task not found");
        }

        if (!task) {
            throw new Error("Provided task is not defined");
        }

        updatedTask = await taskModel.findByIdAndUpdate(id, task, {
            new: true,
        });
    } catch (error) {
        console.log(error);
        updatedTask = null;
    }
    return updatedTask;
}

async function deleteTask(id) {
    return await taskModel.findByIdAndDelete(id);
}

// Filter functions
async function findTaskByUser(user) {
    return await taskModel.find({ user });
}

async function findTaskByUserAndDate(user, date) {
    return await taskModel.find({ user, date });
}

async function findTaskByUserAndFlag(user, flag) {
    return await taskModel.find({ user }, { flag });
}

async function findTaskByUserAndStatus(user, status) {
    return await taskModel.find({ user, status });
}

async function findTaskByUserAndCategory(user, category) {
    return await taskModel.find({ user, categories: { $in: [category] } });
}

async function findTaskByDate(date) {
    return await taskModel.find({ date });
}

async function findTaskByFlag(flagged) {
    return await taskModel.find({ flagged });
}

async function findTaskByStatus(status) {
    return await taskModel.find({ status });
}

export default {
    getTasks,
    findTaskById,
    addTask,
    deleteTask,
    updateTask,
};
