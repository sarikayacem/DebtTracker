import { Navigate, Outlet } from "react-router-dom";
import tokenService from "../services/tokenService";

const AuthLayout = () => {

    if (tokenService.getToken()) {
        return <Navigate to="/" />
    }
    return <Outlet />
}

export default AuthLayout;