import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
// import { ProtectedRoute } from "./components/ProtectedRoute";

function MyApp() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route
                    path="/home/:userId"
                    element={
                        // <ProtectedRoute>
                        <Home />
                        // </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default MyApp;
