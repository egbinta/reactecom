import React, { useState } from "react";
import Navbar from "../layouts/admin/Navbar.jsx";
import Footer from "../layouts/admin/Footer.jsx";
import Sidebar from "../layouts/admin/Sidebar.jsx";
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
    setCategoryInput({ ...categoryInput, [e.target.name]: [e.target.value] });
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
    axios.post(`/api/store-category`, data).then((res) => {
      if (res.data.status === 200) {
        swal("success", res.data.message, "success");
        document.getElementById("category-form").reset();
      } else if (res.data.status === 400) {
        setCategoryInput({
          ...categoryInput,
          error_list: res.data.validation_errors,
        });
      }
    });
  };

  let display_errors = [];

  if (categoryInput.error_list) {
    display_errors = [
      categoryInput.error_list.meta_title,
      categoryInput.error_list.slug,
      categoryInput.error_list.name,
    ];
  }

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

              {display_errors.map((item) => {
                return (
                  <p className="mb-1" key={item}>
                    {item}
                  </p>
                );
              })}

              <div className="card card-body">
                <form onSubmit={handleSubmit} id="category-form">
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="home-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#home-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="home-tab-pane"
                        aria-selected="true"
                      >
                        Home
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="seo-tags-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#seo-tags-pane"
                        type="button"
                        role="tab"
                        aria-controls="seo-tags-pane"
                        aria-selected="false"
                      >
                        SEO-Tags
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="home-tab-pane"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                      tabindex="0"
                    >
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group py-2">
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
                            <small className="text-danger">
                              {categoryInput.error_list.slug}
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group py-2">
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
                            <small className="text-danger">
                              {categoryInput.error_list.name}
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group py-2">
                            <label htmlFor="#">
                              <b>Description</b>
                            </label>
                            <textarea
                              name="description"
                              id=""
                              cols="10"
                              rows="5"
                              onChange={handleInput}
                              value={categoryInput.description}
                              className="form-control"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="#">
                          <b>Status</b>
                        </label>
                        <input
                          type="checkbox"
                          name="status"
                          onChange={handleInput}
                          value={categoryInput.status}
                          className="ml-3"
                        />
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="seo-tags-pane"
                      role="tabpanel"
                      aria-labelledby="seo-tags-tab"
                      tabindex="0"
                    >
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group py-2">
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
                            <small className="text-danger">
                              {categoryInput.error_list.meta_title}
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group py-2">
                            <label htmlFor="#">
                              <b>Meta Keyword</b>
                            </label>
                            <textarea
                              name="meta_keyword"
                              cols="10"
                              rows="5"
                              onChange={handleInput}
                              value={categoryInput.meta_keyword}
                              className="form-control"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group py-2">
                            <label htmlFor="#">
                              <b>Meta Description</b>
                            </label>
                            <textarea
                              name="meta_description"
                              cols="10"
                              rows="5"
                              onChange={handleInput}
                              value={categoryInput.meta_description}
                              className="form-control"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-primary float-end"
                  />
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
