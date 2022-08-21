import React, { useState } from "react";
import styled from "styled-components";
import Input from "./../../atoms/Input";
import Button from "./../../atoms/Button";
import taskService from "../../../services/task";

const EditForm = styled.form`
  display: flex;

  input {
    margin-bottom: 0px;
  }
`;

const TaskEditForm = ({ task, setIsEditing, onUpdate }) => {
  const [editForm, setEditForm] = useState({ description: task.description });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedTask = await taskService.update(
        task.projectId,
        task.id,
        editForm
      );
      onUpdate(updatedTask);
    } catch (err) {
      //
    }
    setIsEditing(false);
  };

  return (
    <EditForm onSubmit={onSubmit}>
      <Input
        value={editForm.description}
        setValue={(value) => setEditForm({ description: value })}
        required
      />
      <Button sm style={{ marginLeft: "5px" }} type="submit">
        Save
      </Button>
    </EditForm>
  );
};

export default TaskEditForm;
