import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, TextField, Typography, Container } from "@mui/material";
import axios from "axios";

function SignUp() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    function handleChange(event) {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value,
        });
    }

    async function createUser(user) {
        try {
            const response = await axios.post(
                "http://localhost:8000/users",
                user
            );
            return response;
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert("User already exists");
            } else {
                console.error("Unexpected error:", error);
            }
            return false;
        }
    }

    async function handleSubmit(e, user) {
        e.preventDefault(); // Prevent the default form behavior
        try {
            // Confirm passwords
            if (user.password !== user.confirmPassword) {
                alert("Passwords do not match");
                return;
            }

            // Request to create user
            const response = await createUser(user);

            // Handle request result
            if (response && response.status === 201) {
                // Successful creation of user
                const newUserId = response.data;
                navigate(`/home/${newUserId}`);
                setUserData({
                    email: "",
                    password: "",
                    confirmPassword: "",
                });
            } else {
                console.error("Failed to create user");
            }
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <div
                style={{
                    marginTop: "8px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography
                    component="h1"
                    variant="h3"
                    style={{ fontWeight: "bold", margin: "20px 0" }}
                >
                    ToDo Croo
                </Typography>
                <form onSubmit={(e) => handleSubmit(e, userData)}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="text"
                        label="Email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        label="Password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        label="Confirm Password"
                        name="confirmPassword"
                        value={userData.confirmPassword}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ margin: "24px 0px 16px" }}
                    >
                        Sign Up
                    </Button>
                    <Link
                        to="/"
                        style={{ textDecoration: "none", marginTop: "10px" }}
                    >
                        {"Already have an account? Sign In"}
                    </Link>
                </form>
            </div>
        </Container>
    );
}

export default SignUp;
