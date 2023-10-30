import express from "express";
import cors from "cors";

import taskServices from "./models/tasks-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// Get requests
// Root
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Users
// Get
app.get("/tasks", async (req, res) => {
    try {
        const user = req.query["user"];
        const date = req.query["date"];
        const flagged = req.query["flagged"];
        const status = req.query["status"];
        const result = await taskServices.getTasks(user, date, flagged, status);
        res.send({ tasks_list: result });
    } catch (error) {
        console.log(error);
        res.status(500).send("An error ocurred in the server.");
        console.log("bad");
    }
});

// Post
app.post("/tasks", async (req, res) => {
    const task = req.body;
    const savedTask = await taskServices.addTask(task);
    if (savedTask) res.status(201).send(savedTask);
    else res.status(500).end();
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

