import userModel from "./user.js";
// import taskModel from "./task.js";

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

async function findUserByName(username) {
    return await userModel.find({ username });
}

export default {
    getUsers,
    getUsersAndTasks,
};
