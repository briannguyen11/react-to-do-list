import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
// import { Container } from "@mui/material";
function MyApp() {
    return (
        // <Login />

        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/home/:userId" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default MyApp;
