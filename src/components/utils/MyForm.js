import { useState } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button, Box, Code } from "@mantine/core";
import axios from "axios";
export default function MyForm() {
  const [submittedValues, setSubmittedValues] = useState("");

  const form = useForm({
    initialValues: {
      img: "",
      name: "",
      brand: "",
      suplier: "",
      original: "",
      price: "",
      quantity: "",
    },

    transformValues: (values) => ({
      img: `${values.img}`,
      name: `${values.name}`,
      brand: `${values.brand}`,
      suplier: `${values.suplier}`,
      original: `${values.original}`,
      price: Number(values.price) || 0,
      quantity: Number(values.quantity) || 0,
    }),
  });
  function handleSubmit() {
    console.log(JSON.parse(submittedValues));
    axios
      .post("http://localhost:8888/create/product", JSON.parse(submittedValues))
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <Box sx={{ width: "60vw" }} mx='auto'>
      <form
        onSubmit={form.onSubmit((values) =>
          setSubmittedValues(JSON.stringify(values, null, 2)),
        )}
      >
        <TextInput
          label='Image product'
          placeholder='Image product'
          required
          {...form.getInputProps("img")}
        />
        <TextInput
          label='Name product'
          placeholder='Name product'
          required
          {...form.getInputProps("name")}
        />
        <TextInput
          label='Brand'
          placeholder='Brand'
          mt='md'
          required
          {...form.getInputProps("brand")}
        />
        <TextInput
          label='Supplier'
          placeholder='Supplier'
          mt='md'
          required
          {...form.getInputProps("supplier")}
        />
        <TextInput
          label='Original'
          placeholder='Original'
          mt='md'
          required
          {...form.getInputProps("original")}
        />
        <TextInput
          type='number'
          label='Price'
          placeholder='Price'
          mt='md'
          required
          {...form.getInputProps("price")}
        />
        <TextInput
          type='number'
          label='Quantity'
          placeholder='Quantity'
          mt='md'
          required
          {...form.getInputProps("quantity")}
        />
        <Button type='submit' mt='md' onClick={handleSubmit}>
          ADD
        </Button>
      </form>

      {/* {submittedValues && <Code block>{submittedValues}</Code>} */}
    </Box>
  );
}
