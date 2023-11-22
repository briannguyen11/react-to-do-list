import taskModel from "./task.js";

async function findTaskById(id) {
    return await taskModel.findById(id);
}

async function addTask(task) {
    let savedTask;
    try {
        const taskToAdd = new taskModel(task);
        savedTask = await taskToAdd.save();
    } catch (error) {
        console.log(error);
        savedTask = null;
    }
    return savedTask;
}

async function updateTask(id, task) {
    let updatedTask;
    try {
        const oldTask = await taskModel.findById(id);

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

export default {
    findTaskById,
    addTask,
    deleteTask,
    updateTask,
};
