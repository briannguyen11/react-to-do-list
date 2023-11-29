import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Container } from "@mui/material";
import { useAuth } from "./AuthProvider";

function Login() {
    const { value } = useAuth();
    const navigate = useNavigate();
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: "",
    });

    function handleChange(event) {
        setUserLogin({
            ...userLogin,
            [event.target.name]: event.target.value,
        });
    }

    async function checkUser(user) {
        try {
            const response = await axios.post(
                "http://localhost:8000/login",
                user
            );
            return response;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert("Incorrect password");
            } else if (error.response && error.response.status === 404) {
                alert("User does not exist");
            } else {
                console.error("Unexpected error:", error);
            }
            return false;
        }
    }

    async function handleSubmit(e, user) {
        e.preventDefault(); // Prevent the default form behavior
        try {
            // Request to check user login
            const response = await checkUser(user);

            // Handle request result
            if (response && response.status === 200) {
                // Successful login
                const userId = response.data;
                value.token = response.data;
                navigate(`/home/${userId}`);
                setUserLogin({
                    email: "",
                    password: "",
                });
            } else {
                console.error("Failed to login");
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
                <form onSubmit={(e) => handleSubmit(e, userLogin)}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="text"
                        label="Email"
                        name="email"
                        value={userLogin.email}
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
                        value={userLogin.password}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ margin: "24px 0px 16px" }}
                    >
                        Sign In
                    </Button>
                    <Link
                        to="/sign-up"
                        style={{ textDecoration: "none", marginTop: "10px" }}
                    >
                        {"Don't have an account? Sign Up"}
                    </Link>
                </form>
            </div>
        </Container>
    );
}

export default Login;
