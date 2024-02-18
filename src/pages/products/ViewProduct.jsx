import React, { useEffect, useState } from "react";
import Navbar from "../../layouts/admin/Navbar.js";
import Footer from "../../layouts/admin/Footer.jsx";
import Sidebar from "../../layouts/admin/Sidebar.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const ViewProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/get-products`).then((res) => {
      if (res.data.status === 200) {
        setProducts(res.data.product);
        setLoading(false);
      } else if (res.data.status === 422) {
        swal("Warning Error", res.data.message, "warning");
      }
    });
  }, []);
  let productData = "";
  productData = products.map((item) => {
    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.category_id}</td>
        <td>{item.name}</td>
        <td>{item.selling_price}</td>
        <td>{item.image}</td>
        <td>
          <Link
            to={`/admin/product/edit-product/${item.id}`}
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
            <div className="container mt-4">
              <div className="card">
                <div className="card-header d-flex align-items-center justify-content-between">
                  <h3>View Product</h3>
                  <Link
                    to="/admin/product/add-product"
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
                        <th>Category ID</th>
                        <th>Product Name</th>
                        <th>Selling Price</th>
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

export default ViewProduct;
