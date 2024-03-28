import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import swal from "sweetalert";
import Navbar from "../../layouts/frontend/Navbar";
import Collection from "./Collection";

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const param = useParams();
  const productId = param.productId;

  useEffect(() => {
    axios.post(`/api/get-category-product/${productId}`).then((res) => {
      if (res.data.status === 200) {
        setProducts(res.data.products);
      } else if (res.data.status === 404) {
        swal("warning", res.data.message, "Warning");
      }
    });
  }, [productId]);

  console.log(products);

  return (
    <>
      <Navbar />
      <Collection />
      <div className="container mt-4">
        {products?.map((item) => (
          <div className="card" style={{ width: "18rem" }} key={item.id}>
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
                <Link to="" className="btn btn-primary">
                  Go somewhere
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductCard;
