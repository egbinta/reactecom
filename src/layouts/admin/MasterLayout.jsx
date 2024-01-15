import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "../../admin/css/styles.css";
import "../../admin/js/scripts.js";
import Testpage from "../../pages/Testpage.js";
import Dashboard from "../../pages/Dashboard.js";
import Profile from "../../components/admin/Profile.js";
import Home from "../../components/frontend/Home.js";

//import routes from "../../routes/route.js";

// <Route path="/admin/*" element={<MasterLayout props={...props} />} />
const MasterLayout = () => {
  return (
    <div className="sb-nav-fixed">
      <Navbar />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <Sidebar />
        </div>

        <div id="layoutSidenav_content">
          <main>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/testpage" element={<Testpage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;
