import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import SuperAdminSidebar from "../pages/SuperAdmin/SuperAdminSidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";

export const SADashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!token || role !== "SuperAdmin") {
      localStorage.clear();
      Navigate("/Login");
    }
  }, [role, token]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBanner(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <SuperAdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
            {/* Welcome banner */}
            {showBanner && <WelcomeBanner />}

            {/* Dashboard actions */}
            <div className="mb-8 sm:flex sm:justify-between sm:items-center">
              {/* Left: Avatars */}
              {/* <DashboardAvatars /> */}
            </div>
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
