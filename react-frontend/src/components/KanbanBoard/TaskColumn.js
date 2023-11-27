import React from "react";
import TaskCard from "./TaskCard";
import { getStatusColor } from "../../styles/StatusAndCategory";
import { Container } from "@mui/material";
import { Droppable } from "react-beautiful-dnd";
import CircleIcon from "@mui/icons-material/Circle";

const ColumnTitle = ({ title }) => {
    return (
        <div
            style={{
                backgroundColor: getStatusColor(title).backgroundColor,
                display: "inline-flex",
                alignItems: "center",
                borderRadius: 32,
                padding: "4px 15px 4px 10px", // top right bottom left
            }}
        >
            <CircleIcon
                style={{
                    color: getStatusColor(title).iconColor,
                    fontSize: "14px",
                    marginRight: "4px",
                }}
            />
            {title}
        </div>
    );
};

function TaskColumn({ title, id, tasks }) {
    return (
        <Container>
            <Droppable droppableId={id}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={{
                            background: snapshot.isDraggingOver
                                ? "#5E8AAB"
                                : "lightgrey",
                            overflow: "hidden", // Hide the scrollbar
                        }}
                    >
                        <ColumnTitle title={title} />
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
