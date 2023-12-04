import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./TaskForm";
import TaskTable from "./TaskTable";
import TaskInfo from "./TaskInfo";
import TaskBoard from "./KanbanBoard/TaskBoard";
import ControlBar from "./ControlBar";
import { useParams } from "react-router-dom";
import { statuses, categories } from "../styles/StatusAndCategory";
import { motion, AnimatePresence, easeIn, easeOut } from "framer-motion";
import { Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

// const USERS_API_URL = "http://localhost:8000/users";
const USERS_API_URL = "https://croolist.azurewebsites.net/users";
// const TASKS_API_URL = "http://localhost:8000/tasks"
const TASKS_API_URL = "https://croolist.azurewebsites.net/tasks";

function Home() {
    const { userId } = useParams();
    const [tasks, setTasks] = useState([]);
    const [taskId, setTaskId] = useState(null);
    const [filter, setFilter] = useState(null);
    const [taskView, setTaskView] = useState("taskTable");
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [showTaskInfo, setShowTaskInfo] = useState(false);

    const toggleTaskForm = () => {
        setShowTaskForm(!showTaskForm);
    };

    const toggleTaskInfo = () => {
        setShowTaskInfo(!showTaskInfo);
    };

    const handleTaskView = (selectedView) => {
        setTaskView(selectedView);
    };

    /**
     *  GET tasks based on id
     */
    const getTaskId = (id) => {
        setTaskId(id);
    };

    /**
     *  GET tasks based on filter
     */
    async function handleFilterChange(filterCriteria) {
        let status = null;
        let category = null;
        let flagged = null;

        setFilter(filterCriteria);

        // Check if the selected filter is a status or category
        if (statuses.includes(filterCriteria)) {
            status = filterCriteria;
        } else if (categories.includes(filterCriteria)) {
            category = filterCriteria;
        } else if (filterCriteria === true || filterCriteria === false) {
            flagged = filterCriteria;
        }

        const filteredTasks = await fetchAll(
            userId,
            status,
            null,
            category,
            flagged
        );
        setTasks(filteredTasks);
    }

    /**
     *  GETS all tasks from the DB for user
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
                `${USERS_API_URL}/${userId}`,
                queryParams
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
     *  POST operation for inserting new task
     */
    async function makePostCall(task) {
        try {
            const response = await axios.post(
                `${USERS_API_URL}/${userId}`,
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
                `${USERS_API_URL}/${userId}?id=${taskId}`
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

    /**
     *  PUT operation to update one task
     */
    async function updateOneTask(taskId, taskData) {
        try {
            const response = await axios.put(
                `${TASKS_API_URL}${taskId}`,
                taskData
            );
            if (response.status !== 200) {
                console.error(
                    "Failed to update task. Status:",
                    response.status
                );
                return;
            }

            // Get updated tasks list
            if (filter) {
                handleFilterChange(filter);
            } else {
                const updatedTasks = await fetchAll(userId);
                if (updatedTasks) {
                    setTasks(updatedTasks);
                }
            }
        } catch (error) {
            console.error(
                "An error occurred while updating task:",
                error.message
            );
        }
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
                        <h1
                            style={{
                                display: "flex",
                                alignItems: "center", // Align items vertically in the center
                                color: "black",
                                fontSize: "50px",
                                fontFamily: "Roboto, sans-serif",
                                paddingTop: "50px",
                                paddingBottom: "25px",
                                margin: 0,
                            }}
                        >
                            <span
                                role="img"
                                aria-label="checkmark emoji"
                                style={{ marginRight: "10px" }}
                            >
                                📚
                            </span>{" "}
                            CROO Task List
                        </h1>
                        <ControlBar
                            toggleTaskForm={toggleTaskForm}
                            changeTaskView={handleTaskView}
                            changeTableFilter={handleFilterChange}
                        />
                        <div>
                            {taskView === "taskBoard" && (
                                <div style={{ marginTop: 8 }}>
                                    <TaskBoard
                                        tasks={tasks}
                                        updateOneTask={updateOneTask}
                                        removeOneTask={removeOneTask}
                                        toggleTaskInfo={toggleTaskInfo}
                                        getTaskId={getTaskId}
                                    />
                                </div>
                            )}
                            {taskView === "taskTable" && (
                                <TaskTable
                                    tasks={tasks}
                                    removeOneTask={removeOneTask}
                                    updateOneTask={updateOneTask}
                                    toggleTaskInfo={toggleTaskInfo}
                                    getTaskId={getTaskId}
                                />
                            )}
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
                                            toggleTaskForm={toggleTaskForm}
                                            userId={userId}
                                        />
                                    </Grid>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>

                    {/* TaskInfo (overlay) */}
                    <AnimatePresence>
                        {showTaskInfo && (
                            <>
                                <motion.div
                                    key="TaskInfo"
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
                                        <TaskInfo
                                            taskId={taskId}
                                            toggleTaskInfo={toggleTaskInfo}
                                            handleSave={updateOneTask}
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
