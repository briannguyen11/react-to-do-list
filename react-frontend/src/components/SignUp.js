import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Button, TextField, Typography, Container } from "@mui/material";

// const USERS_API_URL = "http://localhost:8000/users";
const USERS_API_URL = "https://croolist.azurewebsites.net/users";

function SignUp() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    // Add a new state for showing the verification message
    const [showVerificationMessage, setShowVerificationMessage] = useState(false);

    function handleChange(event) {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value,
        });
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
                navigate(`/home/${response.data}`);
                setUserData({
                    email: "",
                    password: "",
                    confirmPassword: "",
                });
                // Show the verification message
                setShowVerificationMessage(true);
            } else {
                console.error("Failed to create user");
            }
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    }
        
    

    async function createUser(user) {
        try {
            const response = await axios.post(`${USERS_API_URL}`, user);
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

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    async function handleSubmit(e, user) {
        e.preventDefault(); // Prevent the default form behavior
        try {
            //email validation check
            if (!isValidEmail(user.email)) {
                alert("Please enter a valid email address.");
                return;
            }
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
                const userId = response.data;
                navigate(`/home/${userId}`);
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
                    {/* Add Snackbar here to show the verification message */}
                    <Snackbar
                        open={showVerificationMessage}
                        autoHideDuration={6000}
                        onClose={() => setShowVerificationMessage(false)}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    >
                        <Alert onClose={() => setShowVerificationMessage(false)} severity="info">
                            Registration successful! Please check your email to verify your account.
                        </Alert>
                    </Snackbar>
                </form>
            </div>
        </Container>
    );
}

export default SignUp;
