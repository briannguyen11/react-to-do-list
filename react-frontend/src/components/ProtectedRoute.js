import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const ProtectedRoute = ({ children }) => {
    const { value } = useAuth();
    console.log(value.token);
    if (!value.token) {
        return <Navigate to="/" replace />;
    }
    return children;
};
