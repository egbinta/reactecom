import React, { useEffect, useState } from "react";
import Navbar from "../../layouts/admin/Navbar.js";
import Footer from "../../layouts/admin/Footer.jsx";
import Sidebar from "../../layouts/admin/Sidebar.jsx";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const EditProduct = () => {
  const [productInput, setProduct] = useState({});
  const [picture, setPicture] = useState(null);
  const [category, setCategory] = useState([]);
  const [error, setError] = useState([]);
  const [allcheckbox, setAllCheckbox] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const param = useParams();
  const productId = param.proId;

  useEffect(() => {
    axios.get(`/api/get-all-category`).then((res) => {
      if (res.data.status === 200) {
        setCategory(res.data.category);
      } else if (res.data.status === 404) {
        swal("Warning", res.data.message, "warning");
      }
    });

    axios.get(`/api/edit-product/${productId}`).then((res) => {
      if (res.data.status === 200) {
        setProduct(res.data.product);
        setAllCheckbox(res.data.product);
        setLoading(false);
      } else if (res.data.status === 404) {
        swal("Warning", res.data.message, "warning");
        navigate("/admin/product/view-product");
      }
    });
  }, [productId, navigate]);

  const handleInput = (e) => {
    e.persist();
    setProduct({ ...productInput, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    e.preventDefault();
    setPicture(e.target.files[0]);
  };

  const handleCheckbox = (e) => {
    e.persist();
    setAllCheckbox({ ...allcheckbox, [e.target.name]: e.target.checked });
  };

  const editProductForm = (e) => {
    e.preventDefault();
    document.getElementById("addProductBtn").innerHTML = "update Product...";
    const formData = new FormData();
    formData.append("_method", "put");
    formData.append("image", picture);
    formData.append("category_id", productInput.category_id);
    formData.append("slug", productInput.slug);
    formData.append("name", productInput.name);
    formData.append("description", productInput.description);
    formData.append("meta_title", productInput.meta_title);
    formData.append("meta_keyword", productInput.meta_keyword);
    formData.append("meta_description", productInput.meta_description);
    formData.append("selling_price", productInput.selling_price);
    formData.append("original_price", productInput.original_price);
    formData.append("quantity", productInput.quantity);
    formData.append("brand", productInput.brand);
    formData.append("featured", allcheckbox.featured ? "1" : 0);
    formData.append("popular", allcheckbox.popular ? "1" : 0);
    formData.append("status", allcheckbox.status ? "1" : 0);

    axios
      .post(`api/update-product/${productId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          swal("Success", res.data.message, "success");
          document.getElementById("addProductBtn").innerHTML = "update Product";
          navigate("/admin/product/view-product");
        } else if (res.data.status === 422) {
          setError(res.data.error);
          document.getElementById("addProductBtn").innerHTML = "update Product";
        } else if (res.data.status === 404) {
          swal("Error", res.data.message, "error");
        }
      });
  };

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
                  <h3>Edit Product</h3>

                  <Link
                    to="/admin/product/view-product"
                    className="btn btn-primary btn-sm"
                  >
                    View Product
                  </Link>
                </div>
                <div className="card-body">
                  {loading ? (
                    "Loading Product Details..."
                  ) : (
                    <form
                      onSubmit={editProductForm}
                      enctype="multipart/form-data"
                    >
                      <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                          <button
                            class="nav-link active"
                            id="home-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#home"
                            type="button"
                            role="tab"
                            aria-controls="home"
                            aria-selected="true"
                          >
                            Home
                          </button>
                        </li>
                        <li class="nav-item" role="presentation">
                          <button
                            class="nav-link"
                            id="profile-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#profile"
                            type="button"
                            role="tab"
                            aria-controls="profile"
                            aria-selected="false"
                          >
                            SEO Tags
                          </button>
                        </li>
                        <li class="nav-item" role="presentation">
                          <button
                            class="nav-link"
                            id="contact-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#contact"
                            type="button"
                            role="tab"
                            aria-controls="contact"
                            aria-selected="false"
                          >
                            Other Details
                          </button>
                        </li>
                      </ul>
                      <div class="tab-content" id="myTabContent">
                        <div
                          class="tab-pane fade show active card card-body"
                          id="home"
                          role="tabpanel"
                          aria-labelledby="home-tab"
                        >
                          <div className="row mb-2">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="">Select Category</label>
                                <select
                                  name="category_id"
                                  onChange={handleInput}
                                  value={productInput.category_id}
                                  className="form-control"
                                >
                                  <option value="">
                                    ====Select Category====
                                  </option>
                                  {category.map((item) => (
                                    <option value={item.id} key={item.id}>
                                      {item.name}
                                    </option>
                                  ))}
                                </select>
                                <small className="text-danger">
                                  {error.category_id}
                                </small>
                              </div>
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="">Slug</label>
                                <input
                                  type="text"
                                  name="slug"
                                  onChange={handleInput}
                                  value={productInput.slug}
                                  className="form-control"
                                />
                                <small className="text-danger">
                                  {error.slug}
                                </small>
                              </div>
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="">Name</label>
                                <input
                                  type="text"
                                  name="name"
                                  onChange={handleInput}
                                  value={productInput.name}
                                  className="form-control"
                                />
                                <small className="text-danger">
                                  {error.name}
                                </small>
                              </div>
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="">Description</label>
                                <textarea
                                  name="description"
                                  onChange={handleInput}
                                  value={productInput.description}
                                  className="form-control"
                                ></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          class="tab-pane fade card card-body"
                          id="profile"
                          role="tabpanel"
                          aria-labelledby="profile-tab"
                        >
                          <div className="row mb-2">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="">Meta Title</label>
                                <input
                                  type="text"
                                  name="meta_title"
                                  onChange={handleInput}
                                  value={productInput.meta_title}
                                  className="form-control"
                                />
                                <small className="text-danger">
                                  {error.meta_title}
                                </small>
                              </div>
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="">Meta Keyword</label>
                                <textarea
                                  name="meta_keyword"
                                  onChange={handleInput}
                                  value={productInput.meta_keyword}
                                  className="form-control"
                                ></textarea>
                              </div>
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="">Meta Description</label>
                                <textarea
                                  name="meta_description"
                                  onChange={handleInput}
                                  value={productInput.meta_description}
                                  className="form-control"
                                ></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          class="tab-pane fade card card-body"
                          id="contact"
                          role="tabpanel"
                          aria-labelledby="contact-tab"
                        >
                          <div className="row mb-2">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="">Selling Price</label>
                                <input
                                  type="text"
                                  name="selling_price"
                                  onChange={handleInput}
                                  value={productInput.selling_price}
                                  className="form-control"
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="">Original Price</label>
                                <input
                                  type="text"
                                  name="original_price"
                                  onChange={handleInput}
                                  value={productInput.original_price}
                                  className="form-control"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row mb-2">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="">Quantity</label>
                                <input
                                  type="text"
                                  name="quantity"
                                  onChange={handleInput}
                                  value={productInput.quantity}
                                  className="form-control"
                                />
                              </div>
                              <small className="text-danger">
                                {error.quantity}
                              </small>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="">Brand</label>
                                <input
                                  type="text"
                                  name="brand"
                                  onChange={handleInput}
                                  value={productInput.brand}
                                  className="form-control"
                                />
                                <small className="text-danger">
                                  {error.brand}
                                </small>
                              </div>
                            </div>
                          </div>

                          <div className="row mb-2">
                            <div className="col-8">
                              <div className="form-group">
                                <input type="file" onChange={handleImage} />
                                <img
                                  src={`http://127.0.0.1:8000/${productInput.image}`}
                                  width="50"
                                  height="50"
                                  alt=""
                                />
                                <small className="text-danger">
                                  {error.image}
                                </small>
                              </div>
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-md-4">
                              <div className="form-group">
                                <label htmlFor="">
                                  <input
                                    type="checkbox"
                                    name="featured"
                                    onChange={handleCheckbox}
                                    checked={
                                      allcheckbox.featured === 1 ? true : false
                                    }
                                  />
                                  Feature (Checked=Shown)
                                </label>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <label>
                                  <input
                                    type="checkbox"
                                    name="popular"
                                    onChange={handleCheckbox}
                                    checked={
                                      allcheckbox.popular === 1 ? true : false
                                    }
                                  />
                                  Popular (Checked=Shown)
                                </label>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <label>
                                  <input
                                    type="checkbox"
                                    onChange={handleCheckbox}
                                    checked={
                                      allcheckbox.status === 1 ? true : false
                                    }
                                    name="status"
                                  />
                                  Status (Checked=Shown)
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-end">
                        <button
                          type="submit"
                          className="btn btn-primary px-3"
                          id="addProductBtn"
                        >
                          Update Product
                        </button>
                      </div>
                    </form>
                  )}
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

export default EditProduct;
