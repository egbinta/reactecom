import axios from "axios";
import React from "react";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = (e) => {
    document.getElementById("logoutBtn").innerHTML = "Loging out...";
    e.preventDefault();
    axios.post(`api/logout`).then((res) => {
      console.log("testing");
      if (res.data.status === 200) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
        localStorage.removeItem("role");
        swal("Success", res.data.message, "success");
        navigate("/");
      }
    });
  };
  let AuthButtons = "";
  if (!localStorage.getItem("auth_token")) {
    AuthButtons = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link text-white" to="/login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/register">
            Register
          </Link>
        </li>
      </ul>
    );
  } else {
    AuthButtons = (
      <li className="nav-item">
        <Link
          onClick={handleLogout}
          className="nav-link text-white btn btn-outline-danger"
          to="/"
          id="logoutBtn"
        >
          Logout
        </Link>
      </li>
    );
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-primary shadow sticky-top">
      <div className="container">
        <Link className="navbar-brand text-white" to="/">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-white" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="#">
                Collection
              </Link>
            </li>
            {AuthButtons}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
