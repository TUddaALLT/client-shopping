import { useState } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button, Box } from "@mantine/core";
import axios from "axios";
export default function MyForm() {
  const [submittedValues, setSubmittedValues] = useState("");
  const form = useForm({
    initialValues: {
      img: "",
      name: "",
      brand: "",
      author: "",
      category: "",
      suplier: "",
      original: "",
      price: "",
      quantity: "",
    },

    transformValues: (values) => ({
      img: `${values.img}`,
      name: `${values.name}`,
      brand: `${values.brand}`,
      author: `${values.author}`,
      category: `${values.category}`,
      suplier: `${values.suplier}`,
      original: `${values.original}`,
      price: Number(values.price) || 0,
      quantity: Number(values.quantity) || 0,
    }),
  });
  function handleSubmit() {
    console.log();
    console.log(JSON.parse(submittedValues).author);

    axios
      .post("http://localhost:8888/create/product", {
        author: JSON.parse(submittedValues).author,
        name: JSON.parse(submittedValues).name,
        brand: JSON.parse(submittedValues).brand,
        category: JSON.parse(submittedValues).category,
        img: JSON.parse(submittedValues).img,
        suplier: JSON.parse(submittedValues).suplier,
        original: JSON.parse(submittedValues).original,
        price: JSON.parse(submittedValues).price,
        quantity: JSON.parse(submittedValues).quantity,
      })
      .then(function (response) {
        alert("Add oke");
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
          label='Author'
          placeholder='Author'
          mt='md'
          required
          {...form.getInputProps("author")}
        />
        <TextInput
          label='Category'
          placeholder='Category'
          mt='md'
          required
          {...form.getInputProps("category")}
        />
        <TextInput
          label='suplier'
          placeholder='suplier'
          mt='md'
          required
          {...form.getInputProps("suplier")}
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
