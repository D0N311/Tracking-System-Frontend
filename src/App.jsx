import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {PrivateRoutes, PublicRoutes} from './routes';
import {UserProvider} from './services/UserContext';
import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import {Dashboard, Login, Register, SADashboard } from './pages';

import {Company, CompanyProfile} from '../src/pages/SuperAdmin';


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
                <Route element={<Dashboard/>} path="/Dashboard"/>
                <Route element={<SADashboard/>} path="/Dashboard/SuperAdmin/*"/>
                <Route element={<Company/>} path="/Company"/>
                <Route element={<CompanyProfile/>} path="/Profile"/>
            </Route>
          </Routes>
          </UserProvider>
    </div>
  );
}

export default App;