import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "@mantine/core";

function Order() {
  const [data, setData] = useState();
  console.log(data);

  const token = localStorage.getItem("token");
  useEffect(() => {
    axios.interceptors.request.use(
      (config) => {
        config.headers["Authorization"] = `Token ${token}`;
        config.headers["Access-Control-Allow-Origin"] =
          "GET,PUT,POST,DELETE,PATCH,OPTIONS";
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
    axios
      .get(`http://localhost:8888/myorder`)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div style={{ display: "flex", padding: "10vh 10vw" }}>
      <div>
        <h1>My Order</h1>
        {data != null &&
          data.data.map((o, index) => {
            return (
              <div
                key={o.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "3vh",
                  marginBottom: "10vh",
                  border: "1px solid gray",
                  borderRadius: "5px",
                }}
              >
                <h2>Order {index + 1}.</h2>
                <h2>Name: {o.name}</h2>
                <h2>Address: {o.address}</h2>
                <h2>Date: {o.orderDate}</h2>
                <h2>Phone: {o.phoneNumber}</h2>
                {o.products.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      display: "flex",
                      gap: "5vw",
                      alignItems: "center",
                    }}
                  >
                    <img style={{ maxHeight: "30vh" }} src={p.img}></img>
                    <div>
                      <div>{p.name}</div>{" "}
                      <h2>
                        {Intl.NumberFormat("de-DE", {
                          style: "currency",
                          currency: "VND",
                        }).format(p.price)}
                      </h2>{" "}
                      <div>
                        {o.orderDetails.map((c) => {
                          if (c.id_product == p.id) {
                            return (
                              <div key={c.productID}>
                                <h2>Quantity: {c.quantity}</h2>
                                <h2>
                                  Price:{" "}
                                  {Intl.NumberFormat("de-DE", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(c.quantity * p.price)}
                                </h2>
                              </div>
                            );
                          }
                        })}
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  variant='gradient'
                  gradient={{ from: "red", to: "red" }}
                  //   onClick={handleOrder}
                >
                  Cancel Order
                </Button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Order;
