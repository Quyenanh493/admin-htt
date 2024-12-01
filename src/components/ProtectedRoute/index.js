import { Navigate } from "react-router-dom";
import { getCookie } from "../../helpers/cookie";

function ProtectedRoute({ element }) {
    const accessToken = getCookie("accessToken");

    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }
    return element;
}

export default ProtectedRoute;
