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

async function addTaskToUser(userId, taskId) {
    // eslint-disable-next-line no-unused-vars
    const taskToAdd = await taskModel.find({ _id: taskId });
    const updatedUser = await userModel.findByIdAndUpdate(userId, {
        $push: { tasks: taskId },
    });
    return updatedUser;
}

async function deleteTaskFromUser(userId, taskId) {
    // Find and delete the task
    await taskModel.findByIdAndDelete(taskId);

    // Find the user by ID
    const user = await userModel.findById(userId);

    // Remove the taskId from the user's tasks array
    user.tasks = user.tasks.filter(
        (userTaskId) => userTaskId.toString() !== taskId
    );

    // Save the updated user
    return await user.save();
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
    deleteTaskFromUser,
    findById,
};
