import { createContext, useContext, useState } from "react";
import { fakeAuth } from "./FakeAuth";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    const handleLogin = async () => {
        const token = await fakeAuth();
        console.log("handleLogin token: " + token);
        setToken(token);
    };

    const handleLogout = () => {
        console.log("handleLogout");
        setToken(null);
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
