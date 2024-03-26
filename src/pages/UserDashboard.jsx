import React, { useState, useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import { UserSidebar } from "../pages/User";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import { Navigate } from "react-router-dom";

export const UDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!token || role !== "User") {
      localStorage.clear();
      Navigate("/Login");
    }
  }, [role, token]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBanner(false);
    }, 5000);

    return () => clearTimeout(timer); // This will clear the timer when the component unmounts
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <UserSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
            {/* Welcome banner */}
            {showBanner && <WelcomeBanner />}
            {/* Render child routes */}
            <div className="w-full">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
