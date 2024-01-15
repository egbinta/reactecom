import React, { useState, useEffect, useNavigate } from "react";
import axios from "axios";

const Dasboard = () => {
  console.log("hhhhh");
  const token = localStorage.getItem("auth_token");
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(true);
  useEffect(() => {
    axios
      .get(`/api/checkingAuthenticated`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("resss", res);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          console.log("you are unauthorized");
          navigate("/tette");
        }
      });
  }, []);
  return <div>This is the dashboard</div>;
};

export default Dasboard;
