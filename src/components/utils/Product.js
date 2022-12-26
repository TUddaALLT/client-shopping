import {
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Image,
  NumberInput,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";

const Product = (props) => {
  const [value, setValue] = useState(1);
  let data = props.data;

  if (data.price > 1000) {
    data.price = Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "VND",
    }).format(data.price);
  }
  return (
    <div style={{ padding: "8vh 10vw" }}>
      <Grid
        style={{
          backgroundColor: "#e2ece0",
          borderRadius: "5px",
        }}
      >
        <Grid.Col sm={12} lg={4}>
          <Card shadow='sm' p='lg' radius='md' withBorder>
            <Card.Section
              //   height={330}
              component='a'
              href='https://mantine.dev/'
            >
              <Image src={data.img} height={330} alt='Norway' />
            </Card.Section>

            <Group position='apart' mt='md' mb='xs'>
              <Badge color='pink' variant='light'>
                On Sale
              </Badge>
            </Group>

            <Button variant='light' color='blue' fullWidth mt='md' radius='md'>
              Add To Cart
            </Button>
            <Button variant='light' color='blue' fullWidth mt='md' radius='md'>
              Buy Now
            </Button>
          </Card>
        </Grid.Col>
        <Grid.Col sm={12} lg={8}>
          <div style={{ paddingLeft: "3vw" }}>
            <Text size='25px' weight={500}>
              {data.name}
            </Text>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <p>Supplier: {data.supplier}</p>
                <p>Brand: {data.brand}</p>
              </div>
              <div style={{ paddingRight: "10vw" }}>
                <p>Author: {data.author}</p>
              </div>
            </div>

            <Text size='35px' color='red' weight={500}>
              {data.price}
            </Text>
            <p>
              Chính sách đổi trả: Đổi trả sản phẩm trong 30 ngày{" "}
              <Link to='././refund'>Xem Thêm</Link>
            </p>
            <div
              style={{
                width: "300px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2>Quantity</h2>
              <NumberInput
                defaultValue={1}
                placeholder='Quantity'
                withAsterisk
                value={value}
                min={1}
                w='100px'
                onChange={(val) => setValue(val)}
              />
            </div>
          </div>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default Product;
