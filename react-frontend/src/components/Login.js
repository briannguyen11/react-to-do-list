import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
    Button,
    TextField,
    Typography,
    Container,
    Snackbar,
    Alert,
} from "@mui/material";

// const LOGIN_API_URL = "http://localhost:8000/login";
const LOGIN_API_URL = "https://croolist.azurewebsites.net/login";

function Login() {
    const navigate = useNavigate();
    localStorage.removeItem("token");
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: "",
    });
    const [showIncorrectPasswordOverlay, setShowIncorrectPasswordOverlay] =
        useState(false);
    const [showUserNotFoundOverlay, setShowUserNotFoundOverlay] =
        useState(false);

    function handleChange(event) {
        setUserLogin({
            ...userLogin,
            [event.target.name]: event.target.value,
        });
    }

    async function checkUser(user) {
        try {
            const response = await axios.post(`${LOGIN_API_URL}`, user);
            return response;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Show incorrect password overlay
                setShowIncorrectPasswordOverlay(true);
            } else if (error.response && error.response.status === 404) {
                // Show user not found overlay
                setShowUserNotFoundOverlay(true);
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
                localStorage.setItem("token", userId);
                navigate(`/home/`);
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

    const handleCloseOverlays = () => {
        setShowIncorrectPasswordOverlay(false);
        setShowUserNotFoundOverlay(false);
    };

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

                {/* Incorrect Password Overlay */}
                <Snackbar
                    open={showIncorrectPasswordOverlay}
                    autoHideDuration={6000}
                    onClose={handleCloseOverlays}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    style={{ position: "absolute", top: "7%" }}
                >
                    <Alert severity="error" onClose={handleCloseOverlays}>
                        Incorrect password. Please try again.
                    </Alert>
                </Snackbar>

                {/* User Not Found Overlay */}
                <Snackbar
                    open={showUserNotFoundOverlay}
                    autoHideDuration={6000}
                    onClose={handleCloseOverlays}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    style={{ position: "absolute", top: "7%" }}
                >
                    <Alert severity="error" onClose={handleCloseOverlays}>
                        User does not exist.
                    </Alert>
                </Snackbar>

                <form onSubmit={(e) => handleSubmit(e, userLogin)}>
                    {/* Logo or other content goes here */}

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
