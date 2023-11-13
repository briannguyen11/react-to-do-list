import React from "react";
// import { BrowserRouter, Link, Route, Routes, Naviate } from "react-router-dom";
import HomePage from "./Home";
import { Container } from "@mui/material";
// import Login from "./Login";
function MyApp() {
    return (
        <Container style={{ height: "100vh" }}>
            <HomePage />
        </Container>
        // <Routes>
        //     <Route path="/" element={<HomePage />} />
        //     <Route path="/login" element={<Login />} />
        // </Routes>
    );
}

export default MyApp;
