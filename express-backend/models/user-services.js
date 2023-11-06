import userModel from "./user.js";
import taskModel from "./task.js";

async function getUsers(username) {
    let result;
    if (username === undefined) {
        result = await userModel.find();
    } else {
        result = await findUserByName(username);
    }

    return result;
}

async function getUsersAndTasks(username) {
    let result;
    if (username === undefined) {
        result = await userModel.find().populate("tasks");
    } else {
        result = await findUserByName();
    }

    return result;
}

async function addUser(user) {
    const userToAdd = new userModel(user);
    const saveduser = await userToAdd.save();
    return saveduser;
}

async function addTaskToUser(user_id, task_id) {
    // eslint-disable-next-line no-unused-vars
    const taskToAdd = await taskModel.find({ _id: task_id });
    const updatedUser = await userModel.findByIdAndUpdate(user_id, {
        $push: { tasks: task_id },
    });
    return updatedUser;
}

async function deleteUser(id) {
    return await userModel.findByIdAndDelete(id);
}

async function findUserByName(username) {
    return await userModel.find({ username });
}

async function findById(id) {
    return await userModel.findById(id);
}

export default {
    getUsers,
    getUsersAndTasks,
    addUser,
    addTaskToUser,
    deleteUser,
    findById,
};
