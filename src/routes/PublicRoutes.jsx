
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom'

export const PublicRoutes = () => {
    const token = localStorage.getItem('token');
    
    if (token) {
        return <Navigate to="/Dashboard" replace/>
    }

    return(
        !token ? <Outlet/> : <Navigate to="/Login" replace/>
    )
    
}