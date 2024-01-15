import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../../layouts/frontend/Navbar";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`/api/register`, data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_user", res.data.username);
          swal("Success", res.data.message, "success");
          navigate("/");
        } else {
          setFormData({ ...formData, error_list: res.data.validation_errors });
        }
      });
    });
  };

  return (
    <div>
      <Navbar />
      <div className="row justify-content-center">
        <div className="col-4 mt-5">
          <div className="card">
            <div className="card-header">
              <h4>Register</h4>
            </div>
            <div className="card-body">
              <form onSubmit={registerSubmit}>
                <div className="form-group my-2">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleInput}
                  />
                  <small className="text-danger">
                    {formData.error_list.name}
                  </small>
                </div>

                <div className="form-group my-2">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleInput}
                  />
                  <small className="text-danger">
                    {formData.error_list.email}
                  </small>
                </div>

                <div className="form-group my-2">
                  <label htmlFor="pass">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleInput}
                  />
                  <small className="text-danger">
                    {formData.error_list.password}
                  </small>
                </div>

                <div className="form-group mt-3">
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
