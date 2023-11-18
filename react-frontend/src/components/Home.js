import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import TaskForm from "./TaskFrom";
import TaskTable from "./TaskTable";
import Grid from "@mui/material/Unstable_Grid2";
import { motion, AnimatePresence, easeIn, easeOut } from "framer-motion";
import { Button, Container } from "@mui/material";

function Home() {
    const { userId } = useParams();
    const [tasks, setTasks] = useState([]);
    const [showTaskForm, setShowTaskForm] = useState(false);

    const toggleTaskForm = () => {
        setShowTaskForm(!showTaskForm);
    };

    /**
     *  GETs all tasks from the DB
     */
    async function fetchAll() {
        try {
            const response = await axios.get(
                `http://localhost:8000/users/${userId}`
            );
            return response.data.tasks_list;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    useEffect(() => {
        fetchAll().then((result) => {
            if (result) setTasks(result);
        });
    }, []);

    /**
     *  POSTs operation for inserting new task
     */
    async function makePostCall(task) {
        try {
            const response = await axios.post(
                `http://localhost:8000/users/${userId}`,
                task
            );
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    function addToList(task) {
        makePostCall(task).then((result) => {
            if (result && result.status === 201) {
                const newTask = result.data;
                setTasks([...tasks, newTask]);
            }
        });
    }

    /**
     *  DELETE operation to delete task
     */
    async function makeDeleteCall(id) {
        try {
            const response = await axios.delete(
                `http://localhost:8000/tasks/${id}`
            );
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    function removeOneTask(id) {
        makeDeleteCall(id).then((result) => {
            if (result && result.status === 204) {
                const updated = tasks.filter((task) => task._id !== id);
                setTasks(updated);
            } else if (result.status === 404) {
                console.log("Task not found.");
            }
        });
    }

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
        <Container style={{ height: "100vh" }}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.5 } }}
                style={{ height: "100vh" }}
            >
                <Grid
                    container
                    spacing={2}
                    style={{ position: "relative", minHeight: "100vh" }}
                >
                    {/* TaskTable (full width) */}
                    <Grid xs={12}>
                        <h1>CROO List</h1>
                        <FilterBar />
                        <div style={{ marginTop: 16 }}>
                            <TaskTable
                                taskData={tasks}
                                removeTask={removeOneTask}
                            />
                        </div>
                    </Grid>

                    {/* TaskForm (overlay) */}
                    <AnimatePresence>
                        {showTaskForm && (
                            <>
                                <motion.div
                                    key="taskForm"
                                    initial={{
                                        x: "100%",
                                        opacity: 0,
                                        transition: easeIn,
                                    }}
                                    animate={{
                                        x: 0,
                                        opacity: 1,
                                        boxShadow:
                                            "-3px 0 3px rgba(0, 0, 0, 0.1)",
                                    }}
                                    exit={{
                                        x: "100%",
                                        opacity: 0,
                                        transition: easeOut,
                                    }}
                                    style={{
                                        position: "fixed",
                                        top: 0,
                                        right: 0,
                                        width: "50%", // Adjust the width as needed
                                        height: "100%",
                                        backgroundColor: "rgba(255, 255, 255)",
                                        zIndex: 2, // Ensure the form is on top
                                    }}
                                >
                                    <Grid
                                        xs={12}
                                        style={{
                                            height: "100%",
                                        }}
                                    >
                                        <TaskForm
                                            handleSubmit={addToList}
                                            exitForm={toggleTaskForm}
                                            userId={userId}
                                        />
                                    </Grid>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </Grid>
            </motion.div>
        </Container>
    );
}

export default Home;
