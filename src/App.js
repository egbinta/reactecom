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
import AddProduct from "./pages/products/AddProduct.jsx";
import ViewProduct from "./pages/products/ViewProduct.jsx";
import EditProduct from "./pages/products/EditProduct.jsx";
import AddProd from "./pages/testpro/AddProd.jsx";
import ViewPro from "./pages/testpro/ViewPro.jsx";
import EditTeatpro from "./pages/testpro/EditTeatpro.jsx";
import ProductCard from "./components/frontend/ProductCard.jsx";
import FrontView from "./pages/productView/FrontView.jsx";

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
      <Route path="/collection" element={<FrontView />} />
      <Route path="/category/:productId" element={<ProductCard />} />

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

      {/* ================================Admin route=================================== */}
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
      <Route path="/admin/product/add-product" element={<AddProduct />} />
      <Route path="/admin/product/view-product" element={<ViewProduct />} />
      <Route
        path="/admin/product/edit-product/:proId"
        element={<EditProduct />}
      />
      <Route path="/admin/testpro/addProduct/" element={<AddProd />} />
      <Route path="/admin/testpro/viewProduct" element={<ViewPro />} />
      <Route path="/admin/testpro/editProduct/:pid" element={<EditTeatpro />} />
    </Routes>
  );
}

export default App;
