import React from "react";
import { Link } from "react-router-dom";

const ProductsComponent = ({ products }) => {
  return (
    <div>
      <div className="container my-5">
        <div className="row row-cols-4">
          {products.map((item) => (
            <div className="col-md-3">
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
                    <Link
                      to={`product-details/${item.id}`}
                      className="btn btn-primary"
                    >
                      Go somewhere
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsComponent;
