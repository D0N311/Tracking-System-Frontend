import React, { useState, useEffect, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import  AdminSidebar from '../pages/Admin/AdminSidebar.jsx';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import { UserContext } from '../services/UserContext';

export const ADashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const context = useContext(UserContext);

  if (context.state.role !== 'Admin' || !context) {
    localStorage.clear();
    Navigate('/Login');
    return null;
  }

  useEffect(() => {
        const timer = setTimeout(() => {
            setShowBanner(false);
        }, 5000);

        return () => clearTimeout(timer); // This will clear the timer when the component unmounts
    }, []);
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
            {/* Welcome banner */}
            {showBanner && <WelcomeBanner />}
              {/* Render child routes */}
            <div className='w-full'>
              <Outlet />
              </div>
          </div>
        </main>
      </div>
    </div>
  );
}