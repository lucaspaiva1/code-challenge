import React, { useState } from "react";
import styled from "styled-components";
import projectService from "../../../services/project";
import Button from "./../../atoms/Button";
import Input from "./../../atoms/Input";
import ErrorMessage from "./../../atoms/ErrorMessage";
import { useProjects } from "../../../providers/project";

const Container = styled.form``;
const Title = styled.h2``;

const CreateProjectForm = () => {
  const { setProjects } = useProjects();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      await projectService.create({
        name,
      });
      const data = await projectService.list();
      setProjects(data);
    } catch (err) {
      setErrorMessage(err);
    }
    setName("");
    setLoading(false);
  };

  return (
    <Container onSubmit={onSubmit}>
      <Title>Create new project</Title>
      <Input
        placeholder={"Project name"}
        name="projectname"
        required
        setValue={(value) => setName(value)}
        value={name}
      />
      <ErrorMessage>{errorMessage}</ErrorMessage>
      <Button fullWidth disabled={loading}>
        Create project
      </Button>
    </Container>
  );
};

export default CreateProjectForm;
