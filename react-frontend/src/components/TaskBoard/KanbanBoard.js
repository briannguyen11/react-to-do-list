import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import KanbanColumn from "./KanbanColumn";

const notStartedTest = ["n1", "n2", "n3"];
const inProgTest = ["p1", "p2", "p3"];
const doneTest = ["d1", "d2", "d3"];

function TaskBoard() {
    return (
        <DragDropContext>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                }}
            >
                <KanbanColumn
                    title={"Not Started"}
                    id={"notStarted"}
                    tasks={notStartedTest}
                />
                <KanbanColumn
                    title={"In Progress"}
                    id={"inProgress"}
                    tasks={inProgTest}
                />
                <KanbanColumn title={"Done"} id={"done"} tasks={doneTest} />
            </div>
        </DragDropContext>
    );
}

export default TaskBoard;
