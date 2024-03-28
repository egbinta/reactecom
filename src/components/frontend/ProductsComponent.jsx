import React from "react";

const ProductsComponent = ({ products }) => {
  return (
    <>
      {products &&
        products.map((item) => (
          <div className="container mt-5 " key={item.id}>
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
          </div>
        ))}
    </>
  );
};

export default ProductsComponent;
