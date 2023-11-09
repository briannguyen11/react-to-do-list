import userModel from "./user.js";
import taskModel from "./task.js";
import taskServices from "./task-services.js";

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
        result = await findUserAndTasksByName(username);
    }

    return result;
}

async function addUser(user) {
    try {
        const userToAdd = new userModel(user);
        const savedUser = await userToAdd.save();

        if (savedUser !== userToAdd) {
            throw new Error("Failed to add user");
        }

        return savedUser;
    } catch (error) {
        console.error(error.message);
    }
}

async function newTaskToUser(userId, task) {
    try {
        console.log("HEY");
        const taskToAdd = await taskServices.addTask(task);
        console.log(taskToAdd);
        if (!taskToAdd) {
            throw new Error("Task not found");
        }
        const updatedUser = await userModel.findByIdAndUpdate(userId, {
            $push: { tasks: taskToAdd._id },
        });
        return updatedUser;
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

async function addTaskToUser(userId, taskId) {
    try {
        const taskToAdd = await taskModel.findById(taskId);
        if (!taskToAdd) {
            throw new Error("Task not found");
        }
        const updatedUser = await userModel.findByIdAndUpdate(userId, {
            $push: { tasks: taskId },
        });
        return updatedUser;
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

async function deleteTaskFromUser(userId, taskId) {
    try {
        // Find and delete the task
        const deletedTask = await taskModel.findByIdAndDelete(taskId);

        if (!deletedTask) {
            throw new Error("Task not found");
        }

        // Find the user by ID
        const user = await userModel.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        // Remove the taskId from the user's tasks array
        user.tasks = user.tasks.filter(
            (userTaskId) => userTaskId.toString() !== taskId
        );

        // Save the updated user
        return await user.save();
    } catch (error) {
        console.error(error.meesage);
        return null;
    }
}

async function deleteUser(id) {
    return await userModel.findByIdAndDelete(id);
}

async function findUserByName(username) {
    return await userModel.find({ username });
}

async function findUserAndTasksByName(username) {
    return await userModel.find({ username }).populate("tasks");
}

async function findUserById(id) {
    return await userModel.findById(id);
}

export default {
    getUsers,
    getUsersAndTasks,
    addUser,
    addTaskToUser,
    newTaskToUser,
    deleteUser,
    deleteTaskFromUser,
    findUserById,
};
