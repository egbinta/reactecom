import React, { useEffect, useState } from "react";
import Sidebar from "../../layouts/admin/Sidebar.jsx";
import Footer from "../../layouts/admin/Footer.jsx";
import Navbar from "../../layouts/admin/Navbar.jsx";
import { Link } from "react-router-dom";
import axios from "axios";

const ViewPro = () => {
  const [productInput, setProductIput] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get("/api/get-testpro").then((res) => {
      if (res.data.status === 200) {
        setProductIput(res.data.testpro);
        setLoading(false);
      }
    });
  }, []);

  let productData = "";
  productData = productInput.map((item) => {
    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.proname}</td>
        <td>{item.proprice}</td>
        <td>
          <img
            src={`http://localhost:8000/${item.image}`}
            width="50"
            height="50"
            alt={item.name}
          />
        </td>
        <td>
          <Link
            to={`/admin/testpro/editProduct/${item.id}`}
            className="btn btn-success btn-sm"
          >
            Edit
          </Link>
        </td>
        <td>
          <Link
            //onClick={(e) => handleDelete(e, item.id)}
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
            <div className="container">
              <div className="card">
                <div className="card-header d-flex align-items-center justify-content-between">
                  <h3>View Test Product</h3>
                  <Link
                    to="/admin/testpro/addProduct"
                    className="btn btn-primary btn-sm "
                  >
                    Add Product
                  </Link>
                </div>
                <div className="card-body">
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th>Image</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? "Product Loading..." : productData}
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

export default ViewPro;
