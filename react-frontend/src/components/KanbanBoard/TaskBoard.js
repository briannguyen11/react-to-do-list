import React, { useState, useEffect } from "react";
import TaskColumn from "./TaskColumn";
import { DragDropContext } from "react-beautiful-dnd";

function TaskBoard({ userId, fetchBoardData, updateOneTask }) {
    const [notStarted, setNotStarted] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [done, setDone] = useState([]);

    useEffect(() => {
        fetchBoardData(userId, "Not Started").then((result) => {
            if (result) setNotStarted(result);
        });
        fetchBoardData(userId, "In Progress").then((result) => {
            if (result) setInProgress(result);
        });
        fetchBoardData(userId, "Done").then((result) => {
            if (result) setDone(result);
        });
    }, [userId]);

    const handleDragEnd = async (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        // Get the task from the appropriate column
        const task =
            source.droppableId === "notStarted"
                ? notStarted.find((item) => item.id === draggableId)
                : source.droppableId === "inProgress"
                  ? inProgress.find((item) => item.id === draggableId)
                  : done.find((item) => item.id === draggableId);

        // Remove task from the source column
        setNotStarted((prevNotStarted) =>
            source.droppableId === "notStarted"
                ? prevNotStarted.filter((item) => item.id !== draggableId)
                : prevNotStarted
        );
        setInProgress((prevInProgress) =>
            source.droppableId === "inProgress"
                ? prevInProgress.filter((item) => item.id !== draggableId)
                : prevInProgress
        );
        setDone((prevDone) =>
            source.droppableId === "done"
                ? prevDone.filter((item) => item.id !== draggableId)
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
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                }}
            >
                <TaskColumn
                    title={"Not Started"}
                    id={"notStarted"}
                    tasks={notStarted}
                />
                <TaskColumn
                    title={"In Progress"}
                    id={"inProgress"}
                    tasks={inProgress}
                />
                <TaskColumn title={"Done"} id={"done"} tasks={done} />
            </div>
        </DragDropContext>
    );
}

export default TaskBoard;
