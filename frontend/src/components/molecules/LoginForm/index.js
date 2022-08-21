import { useState } from "react";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import ErrorMessage from "../../atoms/ErrorMessage";
import styled from "styled-components";
import userService from "../../../services/user";
import { useAuth } from "../../../providers/auth";

const Form = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const LoginForm = () => {
  const { setUser } = useAuth();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      const user = await userService.login(form);
      setUser(user);
    } catch (err) {
      setErrorMessage(err);
    }
    setLoading(false);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Input
        label={"Username"}
        name={"username"}
        value={form.username}
        setValue={(username) => setForm({ ...form, username })}
        required
      />

      <Input
        label={"Password"}
        name={"password"}
        value={form.password}
        setValue={(password) => setForm({ ...form, password })}
        required
        type={"password"}
      />

      <ErrorMessage>{errorMessage}</ErrorMessage>

      <Button
        disabled={loading}
        style={{ marginTop: "auto" }}
        type={"submit"}
        fullWidth
      >
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
