import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import ProductsComponent from "../../components/frontend/ProductsComponent";
import Navbar from "../../layouts/frontend/Navbar";
import Collection from "../../components/frontend/Collection";
import Loader from "../../components/Loader";

const FrontView = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoadng] = useState(true);

  useEffect(() => {
    axios.post("/api/view-product").then((res) => {
      if (res.data.status === 200) {
        setProducts(res.data.product);
        setLoadng(false);
      } else if (res.data.status === 404) {
        swal("Error", res.status.message, "error");
      }
    });
  }, []);

  return (
    <div>
      <Navbar />
      <Collection />
      {loading ? <Loader /> : <ProductsComponent products={products} />}
    </div>
  );
};

export default FrontView;
