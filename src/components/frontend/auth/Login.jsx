import React, { useState } from "react";
import Navbar from "../../../layouts/frontend/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    error_list: [],
  });
  const handleInput = (e) => {
    e.persist();
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    document.getElementById("loginBtn").innerHTML = "Processing...";
    e.preventDefault();
    const data = {
      email: loginData.email,
      password: loginData.password,
    };

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`/api/login`, data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_user", res.data.username);
          localStorage.setItem("role", res.data.role);
          swal("Success", res.data.message, "success");
          if (res.data.role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/");
          }
        } else if (res.data.status === 401) {
          swal("warning", res.data.message, "warning");
          //navigate("/");
          document.getElementById("loginBtn").innerHTML = "Login";
        } else {
          setLoginData({
            ...loginData,
            error_list: res.data.validation_errors,
          });
          document.getElementById("loginBtn").innerHTML = "Login";
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
              <h4>Login</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group my-2">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleInput}
                    className="form-control"
                  />
                  <small className="text-danger">
                    {loginData.error_list.email}
                  </small>
                </div>

                <div className="form-group my-2">
                  <label htmlFor="pass">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleInput}
                    className="form-control"
                  />
                  <small className="text-danger">
                    {loginData.error_list.password}
                  </small>
                </div>

                <div className="form-group mt-3">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    id="loginBtn"
                  >
                    Login
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

export default Login;
