import { NumberInput, Checkbox, Button } from "@mantine/core";
import { Col, Divider, Image, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { useListState } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [data, setData] = useState();
  const navigate = useNavigate();
  function changeQuantity(x, y) {
    let token = localStorage.getItem("token");

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
      .post(`http://localhost:8888/cartdetails/${x}/${y}`)
      .then(function (response) {
        window.location.reload();
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
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
        console.log("test");
        for (let i = 0; i < response.data.data.products.length; i++) {
          response.data.data.products[i] = Object.assign(
            response.data.data.products[i],
            { checked: false },
          );
        }
        localStorage.setItem(
          "products",
          JSON.stringify(response.data.data.products),
        );
        localStorage.setItem(
          "cartDetails",
          JSON.stringify(response.data.data.cartDetails),
        );
        setData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  //check box
  const [values, handlers] = useListState(
    JSON.parse(localStorage.getItem("products")),
  );

  const allChecked = values.every((value) => value.checked);
  const indeterminate = values.some((value) => value.checked) && !allChecked;
  localStorage.setItem("products", JSON.stringify(values));
  let totalOrder = 0;
  let productsOrder = [];
  let cartDetails = JSON.parse(localStorage.getItem("cartDetails"));

  for (const element of values) {
    if (element.checked) {
      for (let j = 0; j < cartDetails.length; j++) {
        if (cartDetails[j].productID === element.id) {
          totalOrder = totalOrder + element.price * cartDetails[j].quantity;
          productsOrder.push({
            id: element.id,
            quantity: cartDetails[j].quantity,
          });
        }
      }
    } else {
      for (let h = 0; h < productsOrder.length; h++) {
        if (productsOrder[h].id === element.id) {
          productsOrder.removeAt(h);
        }
      }
    }
  }
  localStorage.setItem("order", JSON.stringify(productsOrder));

  function handleOrder() {
    navigate(`/order/${totalOrder}`);
  }
  return (
    <div>
      <div
        style={{
          padding: "0 10vw",
          margin: "8vh 0",
        }}
      >
        <Row
          gutter={[24, 24]}
          style={{ marginBottom: "20px", padding: "10px 0" }}
        >
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={16}
            xl={16}
            style={{ backgroundColor: "#f0f0f0", borderRadius: "5px" }}
          >
            <Row>
              <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "center",
                    marginTop: "4px",
                  }}
                >
                  <Checkbox
                    size='lg'
                    checked={allChecked}
                    indeterminate={indeterminate}
                    label='Select All Product'
                    transitionDuration={0}
                    onChange={() =>
                      handlers.setState((current) =>
                        current.map((value) => ({
                          ...value,
                          checked: !allChecked,
                        })),
                      )
                    }
                  />
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    justifyItems: "center",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      paddingRight: "40px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Quantity
                  </div>
                  <div
                    style={{
                      paddingRight: "60px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Total Price
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row
          gutter={[24, 24]}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={16}
            xl={16}
            style={{ backgroundColor: "#f0f0f0", borderRadius: "5px" }}
          >
            {data != null &&
              values.map((product, index) => (
                <Row key={product.id}>
                  <Col lg={16} xl={16}>
                    <div style={{ display: "flex" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Checkbox
                          size='lg'
                          mt='xs'
                          ml={33}
                          key={product.id}
                          checked={product.checked}
                          onChange={(event) => {
                            handlers.setItemProp(
                              index,
                              "checked",
                              event.currentTarget.checked,
                            );
                          }}
                        />
                        <Image
                          width={200}
                          style={{ padding: "15px 25px" }}
                          src={product.img}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <h4>{product.name}</h4>
                        <h2>
                          {Intl.NumberFormat("de-DE", {
                            style: "currency",
                            currency: "VND",
                          }).format(product.price)}
                        </h2>
                      </div>
                    </div>
                  </Col>
                  <Col lg={8} xl={8}>
                    {data.cartDetails.map(
                      (cart) =>
                        cart.productID === product.id && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              height: "100%",
                              justifyContent: "space-around",
                            }}
                            key={cart.id}
                          >
                            <NumberInput
                              defaultValue={1}
                              placeholder='Quantity'
                              withAsterisk
                              value={cart.quantity}
                              min={1}
                              w='100px'
                              onChange={(val) => changeQuantity(cart.id, val)}
                            />
                            <div>
                              <h2 style={{ color: "red" }}>
                                {Intl.NumberFormat("de-DE", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(cart.quantity * product.price)}
                              </h2>
                            </div>
                            <DeleteOutlined
                              style={{
                                fontSize: "30px",
                                color: "#08c",
                                cursor: "pointer",
                              }}
                            />
                          </div>
                        ),
                    )}
                  </Col>
                </Row>
              ))}
          </Col>

          <Col
            xs={24}
            sm={24}
            md={24}
            lg={7}
            xl={7}
            style={{
              backgroundColor: "#f0f0f0",
              borderRadius: "5px",
              height: "fit-content",
              paddingBottom: "2vh",
            }}
          >
            <div
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "space-between",
              }}
            >
              <h3> Price Order</h3>
              <p>
                {" "}
                {Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "VND",
                }).format(totalOrder)}
              </p>
            </div>
            <Divider></Divider>
            <div
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "space-between",
              }}
            >
              <h2>Total Price</h2>
              <h1 style={{ color: "red" }}>
                {Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "VND",
                }).format(totalOrder)}
              </h1>
            </div>
            <Button
              fullWidth
              variant='gradient'
              gradient={{ from: "red", to: "red" }}
              onClick={handleOrder}
            >
              Order
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}
