import React from "react";
import TaskPage from "./TaskPage";
import { Container } from "@mui/material";

function MyApp() {
    return (
        <Container style={{ height: "100vh" }}>
            <TaskPage />
        </Container>
    );
}

export default MyApp;
