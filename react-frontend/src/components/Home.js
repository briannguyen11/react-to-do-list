import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import TaskForm from "./TaskFrom";
import TaskTable from "./TaskTable";
import ControlBar from "./ControlBar";
import Grid from "@mui/material/Unstable_Grid2";
import { motion, AnimatePresence, easeIn, easeOut } from "framer-motion";
import { Container } from "@mui/material";

function Home() {
    const { userId } = useParams();
    const [tasks, setTasks] = useState([]);
    const [showTaskForm, setShowTaskForm] = useState(false);
    const statuses = ["Not Started", "In Progress", "Done"];
    const categories = ["Personal", "School", "Work", "Sports"];

    const toggleTaskForm = () => {
        setShowTaskForm(!showTaskForm);
    };

    const handleFilterChange = async (filterCriteria) => {
        let status = null;
        let category = null;

        // Check if the selected filter is a status or category
        if (statuses.includes(filterCriteria)) {
            status = filterCriteria;
        } else if (categories.includes(filterCriteria)) {
            category = filterCriteria;
        }

        const filteredTasks = await fetchAll(
            userId,
            status,
            null,
            category,
            null
        );
        setTasks(filteredTasks);
    };

    /**
     *  GETs all tasks from the DB
     */
    async function fetchAll(
        userId,
        status = null,
        date = null,
        category = null,
        flagged = null
    ) {
        try {
            const queryParams = {
                params: {
                    status,
                    date,
                    category,
                    flagged,
                },
            };
            const response = await axios.get(
                `http://localhost:8000/users/${userId}`,
                status || date || category || flagged ? queryParams : undefined
            );
            return response.data.tasks_list;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    useEffect(() => {
        fetchAll(userId).then((result) => {
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

    async function addToList(task) {
        const result = await makePostCall(task);
        if (result && result.status === 201) {
            const updatedTasks = await fetchAll(userId);
            if (updatedTasks) {
                setTasks(updatedTasks);
            }
        }
    }

    /**
     *  DELETE operation to delete task
     */
    async function makeDeleteCall(taskId) {
        try {
            const response = await axios.delete(
                `http://localhost:8000/users/${userId}?id=${taskId}`
            );
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    function removeOneTask(taskId) {
        makeDeleteCall(taskId).then((result) => {
            if (result && result.status === 204) {
                const updated = tasks.filter((task) => task._id !== taskId);
                setTasks(updated);
            } else if (result && result.status === 404) {
                console.log("Task not found.");
            }
        });
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
                        <ControlBar
                            toggleTaskForm={toggleTaskForm}
                            onFilterChange={handleFilterChange}
                            statuses={statuses}
                            categories={categories}
                        />
                        <div style={{ marginTop: 16 }}>
                            <TaskTable
                                taskData={tasks}
                                removeOneTask={removeOneTask}
                                statuses={statuses}
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
                                            statuses={statuses}
                                            categories={categories}
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
