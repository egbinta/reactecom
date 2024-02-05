import React, { useEffect, useState } from "react";
import Navbar from "../../layouts/admin/Navbar.js";
import Footer from "../../layouts/admin/Footer.jsx";
import Sidebar from "../../layouts/admin/Sidebar.jsx";
import { Link } from "react-router-dom";
import axios from "axios";

const ViewCategory = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategiries] = useState([]);
  useEffect(() => {
    axios.get("/api/categories").then((res) => {
      if (res.status === 200) {
        setCategiries(res.data.category);
      }
      setLoading(false);
    });
  }, []);

  let category_data = "";

  category_data = categories.map((item) => {
    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.slug}</td>
        <td>{item.name}</td>
        <td>{item.status}</td>
        <td>
          <Link
            to={`/admin/category/edit-category/${item.id}`}
            className="btn btn-success btn-sm"
          >
            Edit
          </Link>
        </td>
        <td>
          <Link
            to={`edit-category/${item.id}`}
            className="btn btn-danger btn-sm"
          >
            Delete
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div className="sb-nav-fixed">
      <Navbar />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <Sidebar />
        </div>

        <div id="layoutSidenav_content">
          <main>
            <div className="container mt-4">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h4>View Category</h4>
                  <Link
                    to="/admin/category/category"
                    className="btn btn-primary btn-sm "
                  >
                    Add Category
                  </Link>
                </div>
                <div className="card-body">
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? "Loading Category..." : category_data}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ViewCategory;
