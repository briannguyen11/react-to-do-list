import React from "react";
import TaskCard from "./TaskCard";
import { Container } from "@mui/material";
import { Droppable } from "react-beautiful-dnd";

function TaskColumn({ title, id, tasks }) {
    return (
        <Container>
            {title}
            <Droppable droppableId={id}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={{
                            background: snapshot.isDraggingOver
                                ? "#5E8AAB"
                                : "lightgrey",
                            padding: 4,
                            minHeight: 500,
                            overflow: "hidden", // Hide the scrollbar
                        }}
                    >
                        <div
                            style={{
                                overflowY: "auto", // Enable vertical scrolling
                                paddingRight: 17, // Adjust for the scrollbar width
                            }}
                        >
                            {tasks.map((task, index) => (
                                <TaskCard
                                    key={index}
                                    index={index}
                                    task={task}
                                />
                            ))}

                            {provided.placeholder}
                        </div>
                    </div>
                )}
            </Droppable>
        </Container>
    );
}

export default TaskColumn;
