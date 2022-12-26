import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Product from "./utils/Product";

const Buy = () => {
  let { id } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:8888/buy/${id}`)
      .then(function (response) {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Product data={data}></Product>
    </div>
  );
};

export default Buy;
