import { Navigate, Outlet } from "react-router-dom";
import tokenService from "../services/tokenService";
import { useState } from "react";

const MainLayout = () => {


    if (!tokenService.getToken) {
        return <Navigate to="/login" />
    }

    const signOut = () => {
        tokenService.clearToken();
        window.location.href = "/login";
    };

    return (
        <div className="flex flex-col">
            <button onClick={signOut} className="p-4 bg-red-400 rounded-md ml-auto mt-3 me-6">Çıkış yap</button>
            <Outlet></Outlet>
        </div>
    )
}

export default MainLayout;