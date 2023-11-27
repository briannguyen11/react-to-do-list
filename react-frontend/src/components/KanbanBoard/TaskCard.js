import React from "react";
import { Draggable } from "react-beautiful-dnd";

function TaskCard({ task, index }) {
    return (
        <>
            {task && (
                <Draggable draggableId={`${task._id}`} index={index}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                                userSelect: "none",
                                padding: 16,
                                margin: "0 0 8px 0",
                                minHeight: "20px",
                                borderRadius: 6,
                                border: "1px solid rgba(0, 0, 0, 0.1)",
                                backgroundColor: snapshot.isDragging
                                    ? "#1976d2"
                                    : "white",
                                fontFamily: "Roboto, sans-serif",
                                fontSize: "16px",
                                fontWeight: 400,
                                color: snapshot.isDragging ? "white" : "black",
                                boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.1)",
                                ...provided.draggableProps.style,
                            }}
                        >
                            {task.title}
                            {provided.placeholder}
                        </div>
                    )}
                </Draggable>
            )}
        </>
    );
}

export default TaskCard;
