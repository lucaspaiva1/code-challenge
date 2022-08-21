import React, { useState } from "react";
import styled from "styled-components";
import Input from "./../../atoms/Input";
import Button from "./../../atoms/Button";
import projectService from "../../../services/project";
import { useProjects } from "../../../providers/project";

const EditForm = styled.form`
  display: flex;
`;

const ProjectEditForm = ({ project, setIsEditing }) => {
  const { projects, setProjects } = useProjects();

  const [editForm, setEditForm] = useState({ name: project.name });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProject = await projectService.update(project.id, editForm);
      setProjects(
        projects.map((p) => {
          return p.id === project.id ? { ...p, name: updatedProject.name } : p;
        })
      );
    } catch (err) {
      //
    }
    setIsEditing(false);
  };

  return (
    <EditForm onSubmit={onSubmit}>
      <Input
        value={editForm.name}
        setValue={(value) => setEditForm({ name: value })}
        required
      />
      <Button sm style={{ marginLeft: "5px" }} type="submit">
        Save
      </Button>
    </EditForm>
  );
};

export default ProjectEditForm;
