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
app.get("/tasks", async (req, res) => {
    try {
        const result = await taskServices.getTasks();
        res.send({ tasks_list: result });
    } catch (error) {
        console.log(error);
        res.status(500).send("An error ocurred in the server.");
        console.log("bad");
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

