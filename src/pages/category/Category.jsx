import React, { useState } from "react";
import Navbar from "../../layouts/admin/Navbar.js";
import Footer from "../../layouts/admin/Footer.jsx";
import Sidebar from "../../layouts/admin/Sidebar.jsx";
import axios from "axios";
import swal from "sweetalert";

const Category = () => {
  const [categoryInput, setCategoryInput] = useState({
    slug: "",
    name: "",
    description: "",
    status: "",
    meta_title: "",
    meta_keyword: "",
    meta_description: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setCategoryInput({ ...categoryInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      slug: categoryInput.slug,
      name: categoryInput.name,
      description: categoryInput.description,
      status: categoryInput.status,
      meta_title: categoryInput.meta_title,
      meta_keyword: categoryInput.meta_keyword,
      meta_description: categoryInput.meta_description,
    };
    console.log(data);
    axios.post(`/api/store-category`, data).then((res) => {
      if (res.data.status === 200) {
        swal("success", res.data.message, "success");
        document.getElementById("form_data").reset();
      } else if (res.data.status === 400) {
        setCategoryInput({
          ...categoryInput,
          error_list: res.data.validation_errors,
        });
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
            <div className="container-fluid px-4">
              <h3 className="mt-4">Add Category</h3>
              <div className="card card-body">
                <form onSubmit={handleSubmit} id="form_data">
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
                        SEO Tag
                      </button>
                    </li>
                  </ul>
                  <div class="tab-content" id="myTabContent">
                    <div
                      class="tab-pane fade show active"
                      id="home"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                    >
                      <div className="form-group row">
                        <div className="col-md-6">
                          <label htmlFor="#">
                            <b>Slug</b>
                          </label>
                          <input
                            type="text"
                            name="slug"
                            onChange={handleInput}
                            value={categoryInput.slug}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-md-6">
                          <label htmlFor="#">
                            <b>Name</b>
                          </label>
                          <input
                            type="text"
                            name="name"
                            onChange={handleInput}
                            value={categoryInput.name}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-md-6">
                          <label htmlFor="#">
                            <b>Description</b>
                          </label>
                          <textarea
                            name="description"
                            className="form-control"
                            onChange={handleInput}
                            value={categoryInput.description}
                          ></textarea>
                        </div>
                      </div>
                      <label className="ml-2">
                        <b>status</b>
                      </label>
                      <input
                        type="checkbox"
                        name="status"
                        onChange={handleInput}
                        value={categoryInput.status}
                      />
                    </div>
                    <div
                      class="tab-pane fade"
                      id="profile"
                      role="tabpanel"
                      aria-labelledby="profile-tab"
                    >
                      <div className="form-group row">
                        <div className="col-md-6">
                          <label htmlFor="#">
                            <b>Meta Title</b>
                          </label>
                          <input
                            type="text"
                            name="meta_title"
                            onChange={handleInput}
                            value={categoryInput.meta_title}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-md-6">
                          <label htmlFor="#">
                            <b>Meta Keyword</b>
                          </label>
                          <textarea
                            name="meta_keyword"
                            className="form-control"
                            onChange={handleInput}
                            value={categoryInput.meta_keyword}
                          ></textarea>
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-md-6">
                          <label htmlFor="#">
                            <b>Meta Description</b>
                          </label>
                          <textarea
                            name="meta_description"
                            className="form-control"
                            onChange={handleInput}
                            value={categoryInput.meta_description}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="form-group">
                      <input
                        type="submit"
                        value="Submit"
                        className="btn btn-primary"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Category;
