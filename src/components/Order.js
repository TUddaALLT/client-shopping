import React from "react";
import { useParams } from "react-router-dom";

const Order = () => {
  let { totalPrice } = useParams();
  return <div>{totalPrice}</div>;
};

export default Order;
