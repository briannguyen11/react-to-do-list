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

// Login:
// POST:
app.post("/login", async (req, res) => {
    const user = req.body;
    const result = await userServices.validateUser(user);
    if (result.status === "valid") {
        res.status(200).send(result.userId).end(); // Successful Login
    } else if (result.status === "invalid") {
        res.status(401).end(); // Wrong Passownd
    } else if (result.status === "nonexistent") {
        res.status(404).end(); // User does not exist
    } else [res.status(500).send("An error occured in the server.")];
});

// Users:
// GET:
// Will return subset of users specified by query
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
// Will add a new user to database (SIGNUP)
app.post("/users", async (req, res) => {
    const user = req.body;
    const result = await userServices.addUser(user);
    if (result.status === "success") {
        res.status(201).send(result.userId).end(); // 201 Created
    } else if (result.status === "exists") {
        res.status(409).end(); // 409 Conflict
    } else {
        res.status(500).end(); // 500 Internal Server Error
    }
});

// Users with id:
// GET:
// Will return a subset of the users tasks determined by query fields
app.get("/users/:id", async (req, res) => {
    try {
        const userId = req.params["id"];
        const status = req.query["status"];
        const date = req.query["date"];
        const category = req.query["category"];
        const flagged = req.query["flagged"];
        const result = await userServices.getUserTasks(
            userId,
            status,
            date,
            category,
            flagged
        );
        res.status(200).send({ tasks_list: result });
    } catch (error) {
        console.log(error);
        res.status(500).send("An error ocurred in the server.");
    }
});

// POST:
// Will add a new task to a user
app.post("/users/:id", async (req, res) => {
    const userId = req.params["id"];
    const task = req.body;
    const result = await userServices.addTaskToUser(userId, task);
    if (result) res.status(201).send(result);
    else if (result === 404) res.status(404).send("Resource not found.");
    else if (result === 500) {
        res.status(500).send("An error ocurred in the server.");
    }
});

// DELETE:
// Will delete a task from a user
app.delete("/users/:id", async (req, res) => {
    const userId = req.params["id"];
    const taskId = req.query["id"];
    const result = await userServices.deleteTaskFromUser(userId, taskId);
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
        const status = req.query["status"];
        const result = await taskServices.getTasks(
            user,
            category,
            date,
            flagged,
            status
        );
        res.status(200).send({ tasks_list: result });
    } catch (error) {
        console.log(error);
        res.status(500).send("An error ocurred in the server.");
    }
});

// GET by ID:
app.get("/tasks/:taskId", async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const taskInfo = await taskServices.findTaskById(taskId);
        if (taskInfo) res.status(200).send(taskInfo);
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred in the server.");
    }
});

// POST:
app.post("/tasks", async (req, res) => {
    const task = req.body;
    const savedTask = await taskServices.addTask(task);
    if (savedTask) res.status(201).send(savedTask);
    else res.status(500).end();
});

// Tasks with id
app.put("/tasks/:id", async (req, res) => {
    const task = req.body;
    const taskId = req.params["id"];
    const updatedTask = await taskServices.updateTask(taskId, task);
    if (updatedTask) res.status(200).send(updatedTask);
    else res.status(500).end();
});

app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
