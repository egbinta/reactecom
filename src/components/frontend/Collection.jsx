import { useEffect, useState } from "react";
import Navbar from "../../layouts/frontend/Navbar";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import Products from "./Products";

const Collection = () => {
  const [category, setCategory] = useState([]);
  const [productCategory, setProductCategory] = useState([]);
  const [loading, setLoadng] = useState(true);
  useEffect(() => {
    axios.get("/api/get-category").then((res) => {
      if (res.data.status === 200) {
        setCategory(res.data.product);
        setLoadng(false);
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
      }
    });
  }, []);
  const handleClick = (category_id) => {
    console.log(category_id);
    axios.post(`/api/product-category/${category_id}`).then((res) => {
      if (res.data.status === 200) {
        setProductCategory(res.data.productCategory);
      } else if (res.data.status === 404) {
        swal("Warning", res.data.status, "warning");
      }
    });
  };

  let categoryItem = "";
  categoryItem = category.map((item) => {
    return (
      <Link
        to={`/category/${item.id}`}
        style={{
          marginRight: "15px",
          cursor: "pointer",
          fontSize: "15px",
          fontWeight: "700",
        }}
      >
        {item.category.name}
      </Link>
    );
  });

  return (
    <div>
      <Navbar />
      <div className="p-3" style={{ background: "#aae2f8" }}>
        <div className="container">
          {loading ? (
            <span style={{ fontWeight: "600", fontSize: "12px" }}>
              Loading Category...
            </span>
          ) : (
            categoryItem
          )}
        </div>
      </div>
      <div className="container mt-5">
        <Products products={category} />
      </div>

      {/* product category component */}
      {/* <div className="container mt-5">
        <ProductCard products={productCategory} />
      </div> */}
    </div>
  );
};

export default Collection;
