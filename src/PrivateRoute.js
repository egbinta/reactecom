import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import Dashboard from "./pages/Dashboard";

const PrivateRoute = () => {
  const token = localStorage.getItem("auth_token");
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    axios
      .get(`/api/checkingAuthenticated`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      });
  }, []);

  axios.interceptors.response.use(
    undefined,
    function axiosRetryInterceptor(err) {
      if (err.response.status === 401) {
        swal("Unauthorized", err.response.data.message, "warning");
        <Navigate to="/" replace />;
      }
      return Promise.reject(err);
    }
  );

  const isAuthenticated = () => {
    return authenticated;
  };
  const PrivateRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to="/login" />;
  };

  return <div></div>;
};

export default PrivateRoute;
