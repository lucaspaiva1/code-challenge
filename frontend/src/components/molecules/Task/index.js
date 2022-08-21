import { useState, useEffect } from "react";
import styled from "styled-components";
import taskService from "../../../services/task";
import { useProjects } from "../../../providers/project";
import Icon from "../../atoms/Icon";
import TaskEditForm from "../../molecules/TaskEditForm";

const Container = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 2px;
`;

const ActionButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  padding: 0px;
  margin-left: 5px;
`;

const Checkbox = styled.input`
  cursor: ${(props) => (props.checked ? "initial" : "pointer")};
`;

const TaskDescription = styled.span`
  font-size: 18px;
  cursor: ${(props) => (props.title ? "pointer" : "initial")};
`;

const Task = ({ task }) => {
  const { projects, setProjects } = useProjects();

  const [disabled, setDisabled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setisHovered] = useState(false);

  const onEdit = () => {
    setIsEditing(true);
  };

  const onDelete = async () => {
    try {
      await taskService.delete(task.projectId, task.id);
      deleteTask();
    } catch (err) {
      //
    }
  };

  useEffect(() => {
    if (task.finishedAt) {
      setDisabled(true);
    }
  }, [task]);

  const changeTaskStatus = async (value) => {
    if (value !== true) return;

    setDisabled(true);

    try {
      const updatedTask = await taskService.update(task.projectId, task.id, {
        done: true,
      });
      updateTask(updatedTask);
    } catch (err) {
      //
    }
  };

  const updateTask = (updatedTask) => {
    setProjects(
      projects.map((p) =>
        p.id === updatedTask.projectId
          ? {
              ...p,
              tasks: p.tasks.map((t) =>
                t.id === updatedTask.id ? updatedTask : t
              ),
            }
          : p
      )
    );
  };

  const deleteTask = () => {
    setProjects(
      projects.map((p) =>
        p.id === task.projectId
          ? {
              ...p,
              tasks: p.tasks.filter((t) => t.id !== task.id),
            }
          : p
      )
    );
  };

  const tooltip = () => {
    if (task.finishedAt) {
      const date = new Date(task.finishedAt).toLocaleDateString();
      return { title: `Finished at ${date}` };
    }
    return {};
  };

  return (
    <Container
      onMouseEnter={() => setisHovered(true)}
      onMouseLeave={() => setisHovered(false)}
    >
      {!isEditing && (
        <>
          <Checkbox
            type="checkbox"
            name={task.id}
            onChange={(e) => changeTaskStatus(e.target.checked)}
            disabled={disabled}
            checked={disabled}
          />
          <TaskDescription {...tooltip()}>{task.description}</TaskDescription>
        </>
      )}
      {!isEditing && isHovered && !task.finishedAt && (
        <>
          <ActionButton>
            <Icon name="edit" onClick={onEdit} />
          </ActionButton>
          <ActionButton>
            <Icon name="delete" onClick={onDelete} />
          </ActionButton>
        </>
      )}
      {isEditing && (
        <TaskEditForm
          task={task}
          setIsEditing={() => setIsEditing(false)}
          onUpdate={(value) => updateTask(value)}
        />
      )}
    </Container>
  );
};

export default Task;
