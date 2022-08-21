import styled from "styled-components";
import Input from "./../../atoms/Input";
import Button from "./../../atoms/Button";
import { useState } from "react";
import taskService from "../../../services/task";
import projectService from "../../../services/project";
import { useProjects } from "../../../providers/project";

const Container = styled.form`
  margin-top: 20px;
  display: flex;
`;

const TaskCreateForm = ({ project }) => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const { setProjects } = useProjects();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await taskService.create(project.id, { description });
      const updatedProjects = await projectService.list();
      setProjects(updatedProjects);
    } catch (err) {}
    setLoading(false);
    setDescription("");
  };

  return (
    <Container onSubmit={onSubmit}>
      <Input
        value={description}
        setValue={(value) => setDescription(value)}
        required
        placeholder="Task"
      />
      <Button sm style={{ marginLeft: "5px" }} type="submit" disabled={loading}>
        Create task
      </Button>
    </Container>
  );
};

export default TaskCreateForm;
