import React from "react";
import { Link } from "react-router-dom";
import { Button, TextField, Typography, Container } from "@mui/material";

function Login() {
    // Handle your submit function
    const handleSubmit = (event) => {
        event.preventDefault();
        // Implement your sign in logic here
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
                <form onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
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
