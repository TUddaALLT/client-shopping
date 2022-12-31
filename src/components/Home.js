import * as React from "react";
import { useState, useEffect } from "react";
import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import Slider from "./utils/Slider";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8888/products")
      .then(function (response) {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  data.map((data) => {
    if (data.price > 1000) {
      data.price = Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "VND",
      }).format(data.price);
    }
    if (data.name.length > 26) {
      data.name = data.name.substring(0, 20) + " ...";
    }
  });
  return (
    <React.Fragment>
      <Slider></Slider>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 10vw",

          flexFlow: "row wrap",
        }}
      >
        {data != null &&
          data.map((data) => (
            <Card
              sx={{ margin: "5vh 2vw" }}
              w='300px'
              h='48vh'
              shadow='sm'
              p='lg'
              radius='md'
              withBorder
              key={data.id}
            >
              <Card.Section>
                <Image src={data.img} height={160} alt='Norway' />
              </Card.Section>

              <Group position='apart' mt='md' mb='xs'>
                <Text weight={500}>{data.name}</Text>
                <Badge color='pink' variant='light'>
                  On Sale
                </Badge>
              </Group>

              <Text size='xl' color='red'>
                {data.price}
              </Text>
              <Link
                to={`/buy/${data.id}/${data.name}`}
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant='light'
                  color='blue'
                  fullWidth
                  mt='md'
                  radius='md'
                >
                  Buy Now
                </Button>
              </Link>
            </Card>
          ))}
      </div>
    </React.Fragment>
  );
}
