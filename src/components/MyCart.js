import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "@mantine/core";

function MyCart() {
  const [data, setData] = useState();
  const [order, setOrder] = useState(false);
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
      .get(`http://localhost:8888/cart`)
      .then(function (response) {
        setData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  function handleOrder() {
    setOrder(!order);
  }
  async function handleOrderApi(cart, e) {
    e.preventDefault();
    console.log(cart);
    const newArray = cart.map((obj) => {
      const { id, ...rest } = obj;
      return rest;
    });
    const result = newArray.map((obj) => {
      const { id = obj.productID, quantity } = obj;
      return { id, quantity };
    });
    console.log(result);
    await axios
      .post("http://localhost:8888/order", {
        totalPrice: data != null ? data.totalPrice : 0,
        address: document.querySelector(".address").value,
        phoneNumber: document.querySelector(".phone").value,
        name: document.querySelector(".name").value,
        products: result,
      })
      .then(function (response) {
        alert("Order successfull");
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <>
      {!order ? (
        <div style={{ display: "flex" }}>
          <div style={{ width: "70%" }}>
            {data != null &&
              data.products.map((p) => (
                <div
                  key={p.id}
                  style={{
                    display: "flex",
                    padding: "10vh 10vw",
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
                      {data.cartDetails.map((c) => {
                        if (c.productID == p.id) {
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
                    <Button
                      variant='gradient'
                      gradient={{ from: "red", to: "red" }}
                      //   onClick={handleOrder}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
          </div>

          <div style={{ width: "30%", padding: "10vh " }}>
            {" "}
            Total price
            <h2>
              {Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "VND",
              }).format(data != null ? data.totalPrice : 0)}
            </h2>
            <Button
              fullWidth
              variant='gradient'
              gradient={{ from: "red", to: "red" }}
              onClick={() => handleOrder()}
            >
              Order
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div
            style={{
              padding: "20vh 10vw",
              display: "flex",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <div style={{ width: "100%", margin: "0 auto", translate: "25%" }}>
              <h1>Information's Buyer</h1>
              <form>
                {" "}
                <input
                  placeholder='Name'
                  style={{
                    marginBottom: "20px",
                    padding: "10px 10px",
                    width: "50%",
                  }}
                  className='name'
                  required
                ></input>
                <br></br>
                <input
                  placeholder='Address'
                  style={{
                    marginBottom: "20px",
                    padding: "10px 10px",
                    width: "50%",
                  }}
                  className='address'
                  required
                ></input>
                <br></br>
                <input
                  placeholder='Phone'
                  style={{
                    marginBottom: "20px",
                    padding: "10px 10px",
                    width: "50%",
                  }}
                  className='phone'
                  required
                ></input>
                <br></br>
                <Button
                  type='submit'
                  variant='gradient'
                  gradient={{ from: "red", to: "red" }}
                  onClick={(e) =>
                    handleOrderApi(data != null ? data.cartDetails : null, e)
                  }
                >
                  Order
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MyCart;
