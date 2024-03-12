import React, { useState } from "react";
import Sidebar from "../../layouts/admin/Sidebar.jsx";
import Footer from "../../layouts/admin/Footer.jsx";
import Navbar from "../../layouts/admin/Navbar.jsx";
import axios from "axios";
import swal from "sweetalert";

const AddProd = () => {
  const [image, setImage] = useState(null);
  const [checked, setChecked] = useState({});
  const [error, setError] = useState([]);
  const [productInput, setProductIput] = useState({
    proname: "",
    proprice: "",
    prodescription: "",
  });

  const handleInput = (e) => {
    e.persist();
    setProductIput({ ...productInput, [e.target.name]: e.target.value });
  };

  const handleCkeckbox = (e) => {
    e.persist();
    setChecked(...checked, [e.target.name], e.target.checked);
  };

  const handleImage = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
  };

  const handleForm = (e) => {
    e.preventDefault();
    console.log(checked);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("proname", productInput.proname);
    formData.append("proprice", productInput.proprice);
    formData.append("prodescription", productInput.prodescription);

    axios
      .post("api/test-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          swal("Success", res.data.message, "success");
          setProductIput({
            proname: "",
            proprice: "",
            prodescription: "",
            image: "",
          });
        } else if (res.data.status === 422) {
          setError(res.data.error);
        }
      });
  };

  return (
    <div className="sb-nav-fixed">
      <Navbar />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <Sidebar />
        </div>

        <div id="layoutSidenav_content">
          <main>
            <div className="container mt-5">
              <div className="card">
                <div className="card-header">
                  <h3>Test Product</h3>
                </div>
                <div className="card-body">
                  <form onSubmit={handleForm}>
                    <div className="form-group mb-2">
                      <label htmlFor="">Product Name</label>
                      <input
                        type="text"
                        name="proname"
                        className="form-control"
                        value={productInput.proname}
                        onChange={handleInput}
                      />
                      <small className="text-danger">{error.proname}</small>
                    </div>
                    <div className="form-group mb-2">
                      <label htmlFor="">Product Price</label>
                      <input
                        type="text"
                        name="proprice"
                        className="form-control"
                        value={productInput.proprice}
                        onChange={handleInput}
                      />
                      <small className="text-danger">{error.proprice}</small>
                    </div>
                    <div className="form-group mb-2">
                      <label htmlFor="">Product Description</label>
                      <input
                        type="text"
                        name="prodescription"
                        className="form-control"
                        value={productInput.prodescription}
                        onChange={handleInput}
                      />
                      <small className="text-danger">
                        {error.prodescription}
                      </small>
                    </div>
                    <div className="form-group mb-2">
                      <label htmlFor="">Product Image</label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={handleImage}
                      />
                      <small className="text-danger">{error.image}</small>
                    </div>
                    <div className="form-group mb-2">
                      <label>
                        <input
                          type="checkbox"
                          checked={checked.feature}
                          onChange={handleCkeckbox}
                        />
                        Feature
                      </label>
                    </div>

                    <div className="form-group mb-2">
                      <label>
                        <input
                          type="checkbox"
                          checked={checked.status}
                          onChange={handleCkeckbox}
                        />
                      </label>
                      Status
                    </div>
                    <button className="btn btn-primary">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AddProd;
