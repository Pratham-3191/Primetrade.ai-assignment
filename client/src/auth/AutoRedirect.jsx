import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const AutoRedirect = ({ children }) => {
    const { user } = useContext(AuthContext);
    return user ? <Navigate to="/" /> : children;
};

export default AutoRedirect;
