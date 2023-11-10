import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import TaskForm from "./TaskFrom";
import TaskTable from "./TaskTable";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Container from "@mui/material/Container";
import { Button } from "@mui/material";

function TaskPage() {
    const [tasks, setTasks] = useState([]);
    const [showTaskForm, setShowTaskForm] = useState(false);

    const toggleTaskForm = () => {
        setShowTaskForm(!showTaskForm);
    };

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

    function FilterBar() {
        return (
            <Grid container spacing={3}>
                <Grid>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={toggleTaskForm}
                    >
                        Add New Item
                    </Button>
                </Grid>
                <Grid>
                    <Button variant="outlined" color="primary">
                        Show Priority
                    </Button>
                </Grid>
                <Grid>
                    <Button variant="outlined" color="primary">
                        Filter By Tags
                    </Button>
                </Grid>
            </Grid>
        );
    }

    return (
        <Container maxWidth="lg">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.5 } }}
            >
                <Grid container spacing={2}>
                    <AnimatePresence>
                        {showTaskForm ? (
                            <>
                                {/* TaskTable (2/3 width) */}
                                <motion.div
                                    key="taskTable"
                                    initial={{ width: "100%" }}
                                    animate={{ width: "66.6%" }}
                                    exit={{ width: "100%" }}
                                >
                                    <Grid xs={12}>
                                        <h1>CROO List</h1>
                                        <FilterBar />
                                        <div style={{ marginTop: 16 }}>
                                            <TaskTable taskData={tasks} />
                                        </div>
                                    </Grid>
                                </motion.div>

                                {/* TaskForm (1/3 width) */}

                                <motion.div
                                    key="taskForm"
                                    initial={{ x: "100%", width: "0%" }}
                                    animate={{ x: 0, width: "33.333%" }}
                                    exit={{ x: "100%", width: "0%" }}
                                >
                                    <Grid xs={12}>
                                        <TaskForm />
                                    </Grid>
                                </motion.div>
                            </>
                        ) : (
                            <Grid xs={12}>
                                <h1>CROO List</h1>
                                <FilterBar />
                                <div style={{ marginTop: 16 }}>
                                    <TaskTable taskData={tasks} />
                                </div>
                            </Grid>
                        )}
                    </AnimatePresence>
                </Grid>
            </motion.div>
        </Container>
    );
}

export default TaskPage;
