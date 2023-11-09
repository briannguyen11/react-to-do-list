import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import taskServices from "./models/task-services.js";
import userServices from "./models/user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

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

// Root:
// GET:
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Users:
// GET:
app.get("/users", async (req, res) => {
    try {
        const user = req.query["user"];
        const result = await userServices.getUsers(user);
        res.send({ user_list: result });
    } catch (error) {
        console.log(error);
        res.status(500).send("An error ocurred in the server.");
    }
});

// POST:
app.post("/users", async (req, res) => {
    const user = req.body;
    const userTask = await userServices.addUser(user);
    if (userTask) res.status(201).send(userTask);
    else res.status(500).end();
});

// Users with id:
// PATCH:
app.patch("/users/:id", async (req, res) => {
    const userId = req.params["id"];
    const taskId = req.body._id;
    const result = await userServices.addTaskToUser(userId, taskId);
    if (result) res.status(204).end();
    else if (result === 404) res.status(404).send("Resource not found.");
    else if (result === 500) {
        res.status(500).send("An error ocurred in the server.");
    }
});

// DELETE:
app.delete("/users/:id", async (req, res) => {
    const userId = req.params["id"];
    const taskId = req.body._id;
    const result = userServices.deleteTaskFromUser(userId, taskId);
    if (result) res.status(204).end();
    else res.status(404).send("Resource not found.");
});

// Tasks:
// GET:
app.get("/tasks", async (req, res) => {
    try {
        const user = req.query["user"];
        const category = req.query["categories"];
        const date = req.query["date"];
        const flagged = req.query["flagged"];
        const completed = req.query["completed"];
        const result = await taskServices.getTasks(
            user,
            category,
            date,
            flagged,
            completed
        );
        res.send({ tasks_list: result });
    } catch (error) {
        console.log(error);
        res.status(500).send("An error ocurred in the server.");
        console.log("bad");
    }
});

// POST:
app.post("/tasks", async (req, res) => {
    const task = req.body;
    const savedTask = await taskServices.addTask(task);
    if (savedTask) res.status(201).send(savedTask);
    else res.status(500).end();
});

// Users and Tasks:
// GET:
app.get("/usersAndTasks", async (req, res) => {
    try {
        const user = req.query["user"];
        const result = await userServices.getUsersAndTasks(user);
        res.send({ user_list: result });
    } catch (error) {
        console.log(error);
        res.status(500).send("An error ocurred in the server.");
    }
});

// async function deleteTaskById(id) {
//     try {
//         if (await taskServices.deleteTask(id)) return true;
//     } catch (error) {
//         console.log(error);
//         return false;
//     }
// }

// async function deleteUserById(id) {
//     try {
//         if (await userServices.deleteUser(id)) return true;
//     } catch (error) {
//         console.log(error);
//         return false;
//     }
// }

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
