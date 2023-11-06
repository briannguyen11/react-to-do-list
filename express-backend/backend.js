import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import taskServices from "./models/task-services.js";

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
        const categories = req.query["categories"];
        const date = req.query["date"];
        const flagged = req.query["flagged"];
        const completed = req.query["completed"];
        const result = await taskServices.getTasks(
            user,
            categories,
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
