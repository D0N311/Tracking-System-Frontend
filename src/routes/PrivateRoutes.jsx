import { UserContext } from "../services/UserContext";
import { useContext } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { SADashboard, ADashboard, UDashboard } from "../pages";
import { UserCards } from "../cards";
import { Company, CompanyProfile, Admin } from "../pages/SuperAdmin";
import { Users } from "../pages/Admin";
import { AddItem } from "../pages/User";

export const PrivateRoutes = () => {
  const token = localStorage.getItem("token");

  const routes = [
    {
      name: "SADashboard",
      path: "dashboard/super-admin",
      element: <SADashboard />,
      children: [
        {
          name: "Company",
          path: "company",
          element: <Company />,
        },
        {
          name: "CompanyProfile",
          path: "profile",
          element: <CompanyProfile />,
        },
        {
          name: "Admin",
          path: "admin",
          element: <Admin />,
        },
      ],
    },
    {
      name: "ADashboard",
      path: "dashboard/admin",
      element: <ADashboard />,
      children: [
        {
          name: "users",
          path: "users",
          element: <Users />,
        },
      ],
    },
    {
      name: "UDashboard",
      path: "dashboard/user",
      element: <UDashboard />,
      children: [
        {
          name: "AddItem",
          path: "add-item",
          element: <AddItem />,
        },
      ],
    },
    // other routes...
  ];

  return token ? (
    <Routes>
      {routes.map((route, i) => (
        <Route key={i} path={route.path} element={route.element}>
          {route.children &&
            route.children.map((child, j) => (
              <Route key={j} path={child.path} element={child.element} />
            ))}
        </Route>
      ))}
    </Routes>
  ) : (
    <Navigate to="/Login" />
  );
};
