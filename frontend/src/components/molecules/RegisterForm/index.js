import React, { useState } from "react";
import styled from "styled-components";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import userService from "../../../services/user";
import { useAuth } from "../../../providers/auth";
import ErrorMessage from "../../atoms/ErrorMessage";

const Form = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const RegisterForm = () => {
  const { setUser } = useAuth();

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      const user = await userService.register(form);
      setUser(user);
    } catch (err) {
      setErrorMessage(err);
    }
    setLoading(false);
  };

  return (
    <Form onSubmit={onSubmit} autoComplete="off">
      <Input
        label={"Full name"}
        name={"fullname"}
        value={form.fullName}
        required
        setValue={(fullName) => setForm({ ...form, fullName })}
      />

      <Input
        label={"Username"}
        name={"username"}
        value={form.username}
        required
        setValue={(username) => setForm({ ...form, username })}
      />

      <Input
        label={"Password"}
        name={"password"}
        value={form.password}
        required
        setValue={(password) => setForm({ ...form, password })}
        type={"password"}
      />

      <ErrorMessage>{errorMessage}</ErrorMessage>

      <Button disabled={loading} fullWidth>
        SignUp
      </Button>
    </Form>
  );
};

export default RegisterForm;
