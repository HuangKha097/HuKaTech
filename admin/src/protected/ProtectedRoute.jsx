import React from 'react';
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function ProtectedRoute ({children}) {
    const token = useSelector((state) => state.user.token);

    if(!token){
        return <Navigate to="/login" />;
    }
    return children;
}