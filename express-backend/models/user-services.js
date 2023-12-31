import userModel from "./user.js";
import taskServices from "./task-services.js";

// Given a user, returns valid status and user id if there is a user with matching email and password in database
async function validateUser(user) {
    try {
        const existingUser = await userModel.findOne({ email: user.email });
        if (existingUser) {
            if (existingUser.password === user.password) {
                return { status: "valid", userId: existingUser._id };
            } else {
                return { status: "invalid" };
            }
        } else {
            return { status: "nonexistent" };
        }
    } catch (error) {
        console.log(error);
        return { status: "fail" };
    }
}

// Given an email, returns a list of users with matching emails
async function getUsers(email) {
    let result;
    if (email === undefined) {
        result = await userModel.find();
    } else {
        result = await userModel.find({ email: email });
    }

    return result;
}

// Given an object representing a user, adds a new user to the database
async function addUser(user) {
    try {
        // Check if a user with the same email already exists
        const existingUser = await userModel.findOne({ email: user.email });
        if (existingUser) {
            return { status: "exists" };
        }

        // If no existing user, proceed to add the new user
        const userToAdd = new userModel(user);
        const savedUser = await userToAdd.save();

        return { status: "success", userId: savedUser._id };
    } catch (error) {
        console.log(error);
        return { status: "fail" };
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

        if (status !== undefined && status !== null) {
            result = tasks.filter((task) => task.status === status);
        } else if (date !== undefined && date !== null) {
            const queryDate = new Date(date);
            result = tasks.filter((task) => {
                const taskDate = new Date(task.date);
                return queryDate.getTime() === taskDate.getTime();
            });
        } else if (category !== undefined && category !== null) {
            result = tasks.filter((task) => task.category === category);
        } else if (flagged !== undefined && flagged !== null) {
            console.log("HEY");
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
        const user = await userModel.findById(userId);

        const taskToAdd = await taskServices.addTask(task);

        if (!user) {
            throw new Error("User not found");
        }

        if (!taskToAdd) {
            throw new Error("Task not found");
        }

        const taskId = taskToAdd._id;

        await userModel.findByIdAndUpdate(userId, {
            $push: { tasks: taskId },
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
    let updatedUser;
    try {
        const user = await userModel.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        const deletedTask = await taskServices.deleteTask(taskId);

        if (!deletedTask) {
            throw new Error("Task not found");
        }

        await userModel.findByIdAndUpdate(userId, {
            $pull: { tasks: taskId },
        });

        updatedUser = await findUserById(userId);
    } catch (error) {
        console.log(error);
        updatedUser = null;
    }
    return updatedUser;
}

async function findOneUserByName(email) {
    return await userModel.findOne({ email });
}

async function findUserAndTasksById(userId) {
    return await userModel.findById(userId).populate("tasks");
}

async function findUserById(id) {
    return await userModel.findById(id);
}

export default {
    validateUser,
    addUser,
    getUsers,
    addTaskToUser,
    getUserTasks,
    deleteTaskFromUser,
    findUserById,
    findOneUserByName,
};
