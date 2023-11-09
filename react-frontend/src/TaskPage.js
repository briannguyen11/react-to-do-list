import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./TaskFrom";
import TaskTable from "./TaskTable";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Container from "@mui/material/Container";

function TaskPage() {
    const [tasks, setTasks] = useState([]);

    /**
     * @brief Gets all tasks from backend.
     */
    async function fetchAll() {
        try {
            const response = await axios.get("http://localhost:8000/tasks");
            return response.data.tasks_list;
        } catch (error) {
            //We're not handling errors. Just logging into the console.
            console.log(error);
            return false;
        }
    }
    useEffect(() => {
        fetchAll().then((result) => {
            if (result) setTasks(result);
        });
    }, []);

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid xs={6} md={8}>
                    <h1>To Do List</h1>
                    <TaskTable taskData={tasks} />
                </Grid>
                <Grid xs={6} md={4}>
                    <h1>Add New Task</h1>
                    <TaskForm />
                </Grid>
            </Grid>
        </Container>
    );
}

export default TaskPage;
