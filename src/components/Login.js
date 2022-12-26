import { useToggle, upperFirst } from "@mantine/hooks";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from "@mantine/core";
import axios from "axios";
const Login = (props: PaperProps) => {
  const [type, toggle] = useToggle(["login", "register"]);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      repassword: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
      repassword: (val) =>
        val.localeCompare(form.values.password) == 0
          ? null
          : "re-Password should equals password",
    },
  });

  function handleAuthentication() {
    // console.log({
    //   username: form.values.email,
    //   password: form.values.password,
    // });
    axios
      .post("http://localhost:8888/login", {
        username: form.values.email,
        password: form.values.password,
      })
      .then(function (response) {
        console.log(response);
        if (response.data.data.username === "admin@gmail.com") {
          localStorage.setItem("admin", "admin");
        } else {
          localStorage.setItem("admin", "");
        }
        if (response.data.status == 400) {
          setSuccess("failed");
        } else if (localStorage.getItem("admin") === "admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div style={{ padding: "10vh 30vw" }}>
      <Paper radius='md' p='xl' withBorder {...props}>
        <Text size='lg' weight={500}>
          Welcome to Mantine, {type} with
        </Text>

        <Group grow mb='md' mt='md'>
          {/* <GoogleButton radius='xl'>Google</GoogleButton>
        <TwitterButton radius='xl'>Twitter</TwitterButton> */}
        </Group>

        <Divider
          label='Or continue with email'
          labelPosition='center'
          my='lg'
        />

        <form onSubmit={form.onSubmit(() => {})}>
          <Stack>
            <TextInput
              required
              label='Email'
              placeholder='hello@mantine.dev'
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
            />

            <PasswordInput
              required
              label='Password'
              placeholder='Your password'
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 6 characters"
              }
            />
            {type === "register" && (
              <PasswordInput
                required
                label='Re-Enter Password'
                placeholder='Your password'
                value={form.values.repassword}
                onChange={(event) =>
                  form.setFieldValue("repassword", event.currentTarget.value)
                }
                error={
                  form.errors.repassword && "re-Password should equals password"
                }
              />
            )}
            <div style={{ margin: "0 auto", color: "red" }}>
              {" "}
              {type === "login" && success === "failed" && (
                <h1>Something is wrong</h1>
              )}
            </div>
            {type === "register" && (
              <Checkbox
                label='I accept terms and conditions'
                checked={form.values.terms}
                onChange={(event) =>
                  form.setFieldValue("terms", event.currentTarget.checked)
                }
              />
            )}
          </Stack>

          <Group position='apart' mt='xl'>
            <Anchor
              component='button'
              type='button'
              color='dimmed'
              onClick={() => toggle()}
              size='xs'
            >
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button type='submit' onClick={handleAuthentication}>
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
};

export default Login;
