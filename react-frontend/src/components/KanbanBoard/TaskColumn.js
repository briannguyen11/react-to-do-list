import React from "react";
import TaskCard from "./TaskCard";
import ContextMenu from "../ContextMenu";
import { getStatusColor } from "../../styles/StatusAndCategory";
import { Container } from "@mui/material";
import { Droppable } from "react-beautiful-dnd";
import CircleIcon from "@mui/icons-material/Circle";

const ColumnTitle = ({ title }) => {
    return (
        <div
            style={{
                backgroundColor: getStatusColor(title).buttonColor,
                display: "inline-flex",
                alignItems: "center",
                borderRadius: 32,
                fontSize: "16px",
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

function TaskColumn({
    title,
    id,
    tasks,
    removeOneTask,
    toggleTaskInfo,
    getTaskId,
}) {
    const { handleContextMenu, contextMenuComponent } = ContextMenu({
        tasks,
        removeOneTask,
        toggleTaskInfo,
        getTaskId,
    });

    return (
        <Container style={{ padding: 0, margin: 0 }}>
            <Droppable droppableId={id}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={{
                            background: snapshot.isDraggingOver
                                ? getStatusColor(title).buttonColor
                                : getStatusColor(title).backgroundColor,
                            borderRadius: 12,
                            overflow: "hidden", // Hide the scrollbar
                        }}
                    >
                        <div
                            style={{
                                paddingTop: 8,
                                paddingRight: 8,
                                paddingLeft: 8,
                            }}
                        >
                            <ColumnTitle title={title} />
                        </div>
                        <div
                            style={{
                                overflowY: "auto",
                                padding: 8,
                            }}
                        >
                            {tasks.map((task, index) => (
                                <div
                                    key={index}
                                    onContextMenu={(event) =>
                                        handleContextMenu(event, index)
                                    }
                                >
                                    <TaskCard index={index} task={task} />
                                </div>
                            ))}

                            {provided.placeholder}
                        </div>
                        {/* Render the context menu component */}
                        {contextMenuComponent}
                    </div>
                )}
            </Droppable>
        </Container>
    );
}

export default TaskColumn;
