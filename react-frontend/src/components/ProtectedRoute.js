// import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export const ProtectedRoute = ({ children }) => {
    const { user } = useAuth() || {};
    if (!user) {
        return children;
        // user is not authenticated
        // return <Navigate to="/" />;
    }
    return children;
};
