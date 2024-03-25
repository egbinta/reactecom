import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import Navbar from "../../layouts/frontend/Navbar";

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const param = useParams();
  const productId = param.productId;

  useEffect(() => {
    axios.post(`/api/get-category-product/${productId}`).then((res) => {
      if (res.data.status === 200) {
        setProducts(res.data.product);
      } else if (res.data.status === 404) {
        swal("warning", res.data.message, "Warning");
      }
    });
  }, []);

  console.log(productId);

  return (
    <>
      <Navbar />
      <h1>Product category</h1>
      {products?.map((item) => (
        <div className="card" style={{ width: "18rem" }}>
          <img
            src={`http://127.0.0.1:8000/${item.image}`}
            height="250"
            alt=""
            className="card-img-top"
          />
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <p className="card-text"> {item.description}</p>

            <div className="d-flex justify-content-between">
              <span>
                <b>N</b>
                {item.selling_price}
              </span>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductCard;
