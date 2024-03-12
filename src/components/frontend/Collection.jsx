import Reacts, { useEffect, useState } from "react";
import Navbar from "../../layouts/frontend/Navbar";
import axios from "axios";
import swal from "sweetalert";

const Collection = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoadng] = useState(true);
  useEffect(() => {
    axios.get("/api/get-category").then((res) => {
      if (res.data.status === 200) {
        setCategory(res.data.category);
        setLoadng(false);
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
      }
    });
  }, []);

  let categoryItem = "";
  categoryItem = category.map((item) => {
    return (
      <span
        style={{
          marginRight: "15px",
          cursor: "pointer",
          fontSize: "15px",
          fontWeight: "700",
        }}
      >
        {item.name}
      </span>
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
    </div>
  );
};

export default Collection;
