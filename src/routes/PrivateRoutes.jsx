import { UserContext } from '../services/UserContext';
import { useContext } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import {SADashboard} from '../pages';
import {Company, SuperAdminSidebar, CompanyProfile} from '../pages/SuperAdmin';

export const PrivateRoutes = () => {
    const token = localStorage.getItem('token');
    
    const routes = [
        {
            name: "SADashboard",
            path: "dashboard/superadmin",
            element: <SADashboard />,
            children: [
                {
                    name: "Company",
                    path: "company",
                    element: <Company />
                },
                {
                    name: "SuperAdminSidebar",
                    path: "superAdminSidebar",
                    element: <SuperAdminSidebar />
                },
                {
                    name: "CompanyProfile",
                    path: "Profile",
                    element: <CompanyProfile />
                }
            ]
        },
        // other routes...
    ];
    
    return(
        token ? (
            <Routes>
                {routes.map((route, i) => (
                    <Route key={i} path={route.path} element={route.element}>
                        {route.children && route.children.map((child, j) => (
                            <Route key={j} path={child.path} element={child.element} />
                        ))}
                    </Route>
                ))}
            </Routes>
        ) : <Navigate to="/Login"/>
    )
}



