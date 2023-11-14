import React from "react";
// import { Route, Routes, Router } from "react-router-dom";
import Home from "./components/Home";
import { Container } from "@mui/material";
// import Login from "./Login";
function MyApp() {
    return (
        <Container style={{ height: "100vh" }}>
            <Home />
        </Container>
        // <Router>
        //     <Routes>
        //         <Route path="/" element={<Login />} />
        //         <Route path="/signup" element={<Signup />} />
        //         <Route path="/home" element={<Home />} />
        //     </Routes>
        // </Router>
    );
}

export default MyApp;
