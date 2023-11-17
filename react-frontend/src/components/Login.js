import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Container, Alert } from "@mui/material";

function Login() {
    const navigate = useNavigate();
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: "",
    });
    const [loginError, setLoginError] = useState(''); // State for handling login errors

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
            if (error.response) {
                // Handle different error statuses
                if (error.response.status === 401) {
                    setLoginError("Incorrect password");
                } else if (error.response.status === 404) {
                    setLoginError("User does not exist");
                } else {
                    setLoginError("An unexpected error occurred");
                }
            } else {
                setLoginError("Could not connect to the server");
            }
            return false;
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await checkUser(userLogin);

        if (response && response.status === 200) {
            const userId = response.data;
            navigate(`/home/${userId}`);
            setUserLogin({ email: "", password: "" });
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
                {loginError && <Alert severity="error">{loginError}</Alert>} {/* Display login error */}
                <form onSubmit={handleSubmit}>
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
