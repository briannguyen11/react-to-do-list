import React from "react";
import { Container } from "@mui/material";
import { Droppable } from "react-beautiful-dnd";

function KanbanColumn({ title, id, tasks }) {
    return (
        <Container style={{ border: "2px" }}>
            {title}
            <Droppable droppableId={id}>
                {(provided, snapshot) => (
                    <TaskList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                    >
                        {tasks.map((task, index) => (
                            <Task key={index} index={index} task={task} />
                        ))}
                        {provided.placeholder}
                    </TaskList>
                )}
            </Droppable>
        </Container>
    );
}

export default KanbanColumn;
