import { createContext, useContext, useState } from "react";
import { fakeAuth } from "./FakeAuth";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    // Load token from localStorage on initial render
    const storedToken = localStorage.getItem("token");
    const [token, setToken] = useState(storedToken);

    const handleLogin = async () => {
        const newToken = await fakeAuth();
        console.log("handleLogin token: " + newToken);
        setToken(newToken);
        localStorage.setItem("token", token);
    };

    const handleLogout = () => {
        console.log("handleLogout");
        setToken(null);
        localStorage.removeItem("token");
    };

    const value = {
        token,
        onLogin: handleLogin,
        onLogout: handleLogout,
    };

    return (
        <AuthContext.Provider value={{ value }}>
            {children}
        </AuthContext.Provider>
    );
};

// give callers access to the context
export const useAuth = () => useContext(AuthContext);
