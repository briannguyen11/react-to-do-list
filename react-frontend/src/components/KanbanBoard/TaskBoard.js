import React, { useState, useEffect } from "react";
import TaskColumn from "./TaskColumn";
import { DragDropContext } from "react-beautiful-dnd";
import Grid from "@mui/material/Unstable_Grid2";

function TaskBoard({
    tasks,
    updateOneTask,
    removeOneTask,
    toggleTaskInfo,
    getTaskId,
}) {
    const [notStarted, setNotStarted] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [done, setDone] = useState([]);

    useEffect(() => {
        // Filter tasks based on their status and update the local state
        const notStartedTasks = tasks.filter(
            (task) => task.status === "Not Started"
        );
        const inProgressTasks = tasks.filter(
            (task) => task.status === "In Progress"
        );
        const doneTasks = tasks.filter((task) => task.status === "Done");

        setNotStarted(notStartedTasks);
        setInProgress(inProgressTasks);
        setDone(doneTasks);
    }, [tasks]);

    const handleDragEnd = async (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        // Get the task from the appropriate column
        const task =
            source.droppableId === "notStarted"
                ? notStarted.find((item) => item._id === draggableId)
                : source.droppableId === "inProgress"
                  ? inProgress.find((item) => item._id === draggableId)
                  : done.find((item) => item._id === draggableId);

        // Remove task from the source column
        setNotStarted((prevNotStarted) =>
            source.droppableId === "notStarted"
                ? prevNotStarted.filter((item) => item._id !== draggableId)
                : prevNotStarted
        );
        setInProgress((prevInProgress) =>
            source.droppableId === "inProgress"
                ? prevInProgress.filter((item) => item._id !== draggableId)
                : prevInProgress
        );
        setDone((prevDone) =>
            source.droppableId === "done"
                ? prevDone.filter((item) => item._id !== draggableId)
                : prevDone
        );

        // Add task to the destination column
        if (destination.droppableId === "notStarted") {
            setNotStarted((prevNotStarted) => [...prevNotStarted, task]);
        } else if (destination.droppableId === "inProgress") {
            setInProgress((prevInProgress) => [...prevInProgress, task]);
        } else if (destination.droppableId === "done") {
            setDone((prevDone) => [...prevDone, task]);
        }

        // Update the task status in the database
        const updatedStatus =
            destination.droppableId === "notStarted"
                ? "Not Started"
                : destination.droppableId === "inProgress"
                  ? "In Progress"
                  : "Done";

        await updateOneTask(draggableId, { status: updatedStatus });
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Grid container spacing={2}>
                <Grid xs={4}>
                    <TaskColumn
                        title={"Not Started"}
                        id={"notStarted"}
                        tasks={notStarted}
                        removeOneTask={removeOneTask}
                        toggleTaskInfo={toggleTaskInfo}
                        getTaskId={getTaskId}
                    />
                </Grid>
                <Grid xs={4}>
                    <TaskColumn
                        title={"In Progress"}
                        id={"inProgress"}
                        tasks={inProgress}
                        removeOneTask={removeOneTask}
                        toggleTaskInfo={toggleTaskInfo}
                        getTaskId={getTaskId}
                    />
                </Grid>
                <Grid xs={4}>
                    <TaskColumn
                        title={"Done"}
                        id={"done"}
                        tasks={done}
                        removeOneTask={removeOneTask}
                        toggleTaskInfo={toggleTaskInfo}
                        getTaskId={getTaskId}
                    />
                </Grid>
            </Grid>
        </DragDropContext>
    );
}

export default TaskBoard;
