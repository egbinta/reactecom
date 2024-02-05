import { Routes, Route, Navigate } from "react-router-dom";
import "../src/assets/admin/css/styles.css";
import "../src/assets/admin/js/scripts.js";
import Testpage from "./pages/Testpage";
import Dashboard from "./pages/Dashboard";
import Home from "./components/frontend/Home.jsx";
import Register from "./components/frontend/auth/Register.jsx";
import Login from "./components/frontend/auth/Login.jsx";
import axios from "axios";
import Category from "./pages/category/Category.jsx";
import ViewCategory from "./pages/category/ViewCategory.jsx";
import EditCategory from "./pages/category/EditCategory.jsx";

axios.defaults.baseURL = "http://127.0.0.1:8000";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {localStorage.getItem("auth_token") ? (
        <Route path="*" element={<Navigate to="/" replace />} />
      ) : (
        <Route path="/register" element={<Register />} />
      )}

      {localStorage.getItem("auth_token") ? (
        <Route path="*" element={<Navigate to="/" replace />} />
      ) : (
        <Route path="/login" element={<Login />} />
      )}

      <Route path="/admin/dashboard" element={<Dashboard />} />

      <Route path="/" element={<Home />} />

      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/profile" element={<Testpage />} />
      <Route path="/admin/category/category" element={<Category />} />
      <Route path="/admin/category/view-category" element={<ViewCategory />} />
      <Route
        path="/admin/category/edit-category/:id"
        element={<EditCategory />}
      />
    </Routes>
  );
}

export default App;
