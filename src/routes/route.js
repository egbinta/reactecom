// import Dashboard from "../components/admin/Dashboard";
// import Profile from "../components/admin/Profile";
// //import { Route, Routes } from "react-router-dom";

// const routes = [
//   { path: "/admin" },
//   { path: "/admin/dashboard", element: <Dashboard /> },
//   { path: "/admin/profile", element: <Profile /> },
// ];

// export default routes;

import React from "react";
import Dashboard from "../components/admin/Dasboard";
import Profile from "../components/admin/Profile";

const routes = [
  {
    path: "/admin",
    element: <MasterLayout />, // Use a valid React component here
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "profile", element: <Profile /> },
      // Other child routes
    ],
  },
];

export default routes;
