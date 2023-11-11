import userModel from "./user.js";
import taskModel from "./task.js";
import taskServices from "./task-services.js";

// Given a username, returns a list of users with matching usernames
async function getUsers(username) {
    let result;
    if (username === undefined) {
        result = await userModel.find();
    } else {
        result = await findUserByName(username);
    }

    return result;
}

// Given an object representing a user, adds a new user to the database
async function addUser(user) {
    try {
        const userToAdd = new userModel(user);
        const savedUser = await userToAdd.save();

        if (savedUser !== userToAdd) {
            throw new Error("Failed to add user");
        }

        return savedUser;
    } catch (error) {
        console.log(error);
    }
}

// Given a userId and optional task fields, returns subset of user tasks matching fields
async function getUserTasks(userId, status, date, category, flagged) {
    let result;

    try {
        const user = await findUserAndTasksById(userId);

        if (!user) {
            throw new Error("No user found");
        }

        const tasks = user.tasks;

        if (status !== undefined) {
            result = tasks.filter((task) => task.status === status);
        } else if (date !== undefined) {
            result = tasks.filter((task) => task.date === date);
        } else if (category !== undefined) {
            result = tasks.filter((task) => task.categories.includes(category));
        } else if (flagged !== undefined) {
            result = tasks.filter(
                (task) => task.flagged === (flagged === "true")
            );
        } else {
            result = tasks;
        }
    } catch (error) {
        console.log(error);
        result = null;
    }

    return result;
}

// Given a userId and an object representing a task, creates the task and adds it to the user
async function addTaskToUser(userId, task) {
    let updatedUser;
    try {
        const taskToAdd = await taskServices.addTask(task);

        if (!taskToAdd) {
            throw new Error("Task not found");
        }

        updatedUser = await userModel.findByIdAndUpdate(userId, {
            $push: { tasks: taskToAdd._id },
        });

        updatedUser = await findUserById(userId);
    } catch (error) {
        console.log(error);
        updatedUser = null;
    }

    return updatedUser;
}

// Given a userId and a taskId, deletes the task and removes it from the user
async function deleteTaskFromUser(userId, taskId) {
    try {
        const deletedTask = await taskModel.findByIdAndDelete(taskId);

        if (!deletedTask) {
            throw new Error("Task not found");
        }

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
        console.log(error);
        return null;
    }
}

async function deleteUser(id) {
    return await userModel.findByIdAndDelete(id);
}

async function findUserByName(username) {
    return await userModel.find({ username });
}

async function findUserAndTasksById(userId) {
    return await userModel.findById(userId).populate("tasks");
}

async function findUserById(id) {
    return await userModel.findById(id);
}

export default {
    addUser,
    getUsers,
    deleteUser,
    addTaskToUser,
    getUserTasks,
    deleteTaskFromUser,
    findUserById,
};
