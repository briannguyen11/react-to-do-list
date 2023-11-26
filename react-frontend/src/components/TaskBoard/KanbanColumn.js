import React from "react";
import { Container } from "@mui/material";
import { Droppable } from "react-beautiful-dnd";

function KanbanColumn({ title, id, tasks }) {
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
                            {tasks}

                            {provided.placeholder}
                        </div>
                    </div>
                )}
            </Droppable>
        </Container>
    );
}

export default KanbanColumn;
