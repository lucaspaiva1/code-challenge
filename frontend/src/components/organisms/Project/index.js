import { useState } from "react";
import styled from "styled-components";
import Card from "./../../atoms/Card";
import Input from "./../../atoms/Input";
import Button from "./../../atoms/Button";
import Icon from "./../../atoms/Icon";
import projectService from "../../../services/project";
import { useProjects } from "../../../providers/project";

const Container = styled.div`
  margin-bottom: 10px;
`;

const ProjectHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #f5f6fa;
`;

const ProjectName = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin: 0px;
`;

const EditForm = styled.form`
  display: flex;
`;

const ActionButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  padding: 0px;
  margin-left: 5px;
`;

const Project = ({ project }) => {
  const { projects, setProjects } = useProjects();

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: project.name });

  const onEdit = () => {
    setIsEditing(true);
  };
  const onDelete = async () => {
    try {
      await projectService.delete(project.id);
      setProjects(projects.filter((p) => p.id !== project.id));
    } catch (err) {}
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProject = await projectService.update(project.id, editForm);
      setProjects(
        projects.map((p) => {
          return p.id === project.id ? updatedProject : p;
        })
      );
    } catch (err) {
      //
    }
    setIsEditing(false);
  };

  const renderEdit = () => {
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

  const renderHeader = () => {
    return (
      <ProjectHeader>
        {!isEditing && (
          <>
            <ProjectName>{project.name}</ProjectName>
            <div>
              <ActionButton>
                <Icon name="edit" onClick={onEdit} />
              </ActionButton>
              <ActionButton>
                <Icon name="delete" onClick={onDelete} />
              </ActionButton>
            </div>
          </>
        )}
        {isEditing && renderEdit()}
      </ProjectHeader>
    );
  };

  return (
    <Container>
      <Card>
        {renderHeader()}
        {project.name}
      </Card>
    </Container>
  );
};

export default Project;
