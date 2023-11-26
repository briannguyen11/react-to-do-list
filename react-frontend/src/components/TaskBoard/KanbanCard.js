import React from "react";

function TaskCard({ task, index }) {
    // return (
    // <Draggable
    //     draggableId={`${task.id}`}
    //     key={task.id}
    //     index={index}
    // ></Draggable>
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                        userSelect: "none",
                        padding: 16,
                        margin: "0 0 8px 0",
                        minHeight: "50px",
                        backgroundColor: snapshot.isDragging
                            ? "#263B4A"
                            : "#456C86",
                        color: "white",
                        ...provided.draggableProps.style,
                    }}
                >
                    {task.title}
                    {provided.placeholder}
                </div>
            )}
        </Draggable>
    );
}

export default TaskCard;
