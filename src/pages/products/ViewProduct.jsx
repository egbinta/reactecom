import React from "react";
import Navbar from "../../layouts/admin/Navbar.js";
import Footer from "../../layouts/admin/Footer.jsx";
import Sidebar from "../../layouts/admin/Sidebar.jsx";

const ViewProduct = () => {
  return (
    <div className="sb-nav-fixed">
      <Navbar />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <Sidebar />
        </div>

        <div id="layoutSidenav_content">
          <main>
            <h1>This is the view product page</h1>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
