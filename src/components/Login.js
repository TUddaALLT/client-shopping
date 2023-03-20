import { useToggle, upperFirst } from "@mantine/hooks";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import {
  TextInput,
  PasswordInput,
  Paper,
  Group,
  PaperProps,
  Button,
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
    if (type === "register") {
      console.log(
        form.values.email,
        form.values.password,
        form.values.repassword,
      );
      axios
        .post("http://localhost:8888/register", {
          username: form.values.email,
          password: form.values.password,
          confirm_password: form.values.password,
        })
        .then(function (response) {
          navigate("/home");
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios
        .post("http://localhost:8888/login", {
          username: form.values.email,
          password: form.values.password,
        })
        .then(function (response) {
          console.log(response);
          if (response.data.data == null) {
            setSuccess("failed");
          }
          localStorage.setItem("token", response.data.data.token);
          if (response.data.data.username === "admin@gmail.com") {
            localStorage.setItem("admin", "admin");
          } else {
            localStorage.setItem("admin", "");
          }
          if (localStorage.getItem("admin") === "admin") {
            navigate("/admin");
          } else {
            navigate("/home");
          }
        })
        .catch(function (error) {
          alert("login failed");
          console.log(error);
          localStorage.removeItem("token");
        });
    }
  }
  return (
    <div style={{ padding: "10vh 30vw" }}>
      <Paper radius='md' p='xl' withBorder {...props}>
        <Group grow mb='md' mt='md'></Group>

        <form onSubmit={form.onSubmit(() => {})}>
          <Stack>
            <TextInput
              required
              label='Username'
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
              {type === "login" && success === "failed" && (
                <h2>Username or password is failed</h2>
              )}
              {type !== "login" && success === "failed" && (
                <h2>Username is existed or password is wrong</h2>
              )}
            </div>
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
