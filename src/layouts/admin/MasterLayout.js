import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "../../admin/css/styles.css";
import "../../admin/js/scripts.js";
import routes from "../../routes/route.js";

          <Route path="/admin/*" element={<MasterLayout props={...props} />} />
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
              {routes.map((route, index) => {
                return (
                  route.component && (
                    <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      element={<Component />}
                      //render={(props) => <route.component {...props} />}
                    />
                  )
                );
              })}
              <Route
                path="/admin"
                element={<Navigate to="/admin/dashboard" replace={true} />}
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;
