import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import TaskDetails from "./components/TaskInfo";
import TaskInfo from "./components/TaskInfo";

function MyApp() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/home/:userId" element={<Home />} />
                <Route path="/tasks/:taskId" element={<TaskInfo />} />
            </Routes>
        </Router>
    );
}

export default MyApp;
