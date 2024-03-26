import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "./routes";
import { UserProvider } from "./services/UserContext";
import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages
import {
  Dashboard,
  Login,
  Register,
  SADashboard,
  ADashboard,
  UDashboard,
} from "./pages";

import { Company, CompanyProfile } from "../src/pages/SuperAdmin";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
          </Route>

          <Route element={<PrivateRoutes />}>
            {/* <Route element={<Dashboard/>} path="/dashboard"/> */}
            <Route element={<SADashboard />} path="/dashboard/super-admin/*" />
            <Route element={<ADashboard />} path="/dashboard/admin/*" />
            <Route element={<UDashboard />} path="/dashboard/user/*" />
            <Route element={<Company />} path="/company" />
            <Route element={<CompanyProfile />} path="/crofile" />
          </Route>
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
