import { useState } from "react";
import styled from "styled-components";
import Card from "./../../atoms/Card";
import Icon from "./../../atoms/Icon";
import ProjectEditForm from "./../../molecules/ProjectEditForm";
import Tasks from "./../../molecules/Tasks";
import projectService from "../../../services/project";
import { useProjects } from "../../../providers/project";
import TaskCreateForm from "../../molecules/TaskCreateForm";

const Container = styled.div`
  margin-bottom: 10px;
`;

const ProjectHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ProjectName = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin: 0px;
`;

const ActionButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  padding: 0px;
  margin-left: 5px;
`;

const Content = styled.div`
  border-top: 1px solid #f5f6fa;
  border-bottom: 1px solid #f5f6fa;
`;

const Project = ({ project }) => {
  const { projects, setProjects } = useProjects();

  const [isEditing, setIsEditing] = useState(false);

  const onEdit = () => {
    setIsEditing(true);
  };

  const onDelete = async () => {
    try {
      await projectService.delete(project.id);
      setProjects(projects.filter((p) => p.id !== project.id));
    } catch (err) {}
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
        {isEditing && (
          <ProjectEditForm project={project} setIsEditing={setIsEditing} />
        )}
      </ProjectHeader>
    );
  };

  return (
    <Container>
      <Card>
        {renderHeader()}
        <Content>
          <Tasks tasks={project.tasks} />
        </Content>
        <TaskCreateForm project={project} />
      </Card>
    </Container>
  );
};

export default Project;
