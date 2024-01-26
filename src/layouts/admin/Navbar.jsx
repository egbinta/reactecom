import axios from "axios";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Navbar = () => {
  const token = localStorage.getItem("auth_token");
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  useEffect(() => {
    axios
      .get(`/api/checkingAuthenticated`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          if (role === "") {
            swal("Unauthorized", "You are Unauthorized ", "warning");
            navigate("/");
          }
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          swal("Unauthorized", "You are Unauthorized ", "warning");
          navigate("/");
        }
      });
  });
  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      <a className="navbar-brand ps-3" to="/admin">
        Start Bootstrap
      </a>
      <button
        className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
        id="sidebarToggle"
        to="#!"
      >
        <i className="fas fa-bars"></i>
      </button>
      <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            placeholder="Search for..."
            aria-label="Search for..."
            aria-describedby="btnNavbarSearch"
          />
          <button
            className="btn btn-primary"
            id="btnNavbarSearch"
            type="button"
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
      </form>
      <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <li className="nav-item dropdown">
          <Link
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            to="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fas fa-user fa-fw"></i>
          </Link>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdown"
          >
            <li>
              <Link className="dropdown-item" to="#!">
                Settings
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="#!">
                Activity Log
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link className="dropdown-item" to="#!">
                Logout
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
