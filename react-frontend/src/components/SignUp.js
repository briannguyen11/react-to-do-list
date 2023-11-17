import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Button, TextField, Typography, Container, Alert } from "@mui/material";

function SignUp() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [signupError, setSignupError] = useState(''); // State for handling signup errors

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
                setSignupError("User already exists");
            } else {
                setSignupError("An unexpected error occurred");
            }
            return false;
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSignupError(''); // Reset the error message

        // Confirm passwords
        if (userData.password !== userData.confirmPassword) {
            setSignupError("Passwords do not match");
            return;
        }

        const user = { email: userData.email, password: userData.password };
        const response = await createUser(user);

        if (response && response.status === 201) {
            const newUserId = response.data;
            navigate(`/home/${newUserId}`);
            setUserData({ email: "", password: "", confirmPassword: "" });
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
                {signupError && <Alert severity="error">{signupError}</Alert>} {/* Display signup error */}
                <form onSubmit={handleSubmit}>
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
