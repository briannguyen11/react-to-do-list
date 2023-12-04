import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    const storedToken = localStorage.getItem("token");
    console.log(storedToken);
    if (storedToken == "null" || storedToken == null) {
        return <Navigate to="/" replace />;
    }
    return children;
};
