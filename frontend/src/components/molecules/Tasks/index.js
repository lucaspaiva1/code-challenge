import styled from "styled-components";
import Task from "./../../molecules/Task";

const Container = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  list-style-type: none;
  margin: 20px 0px;
`;

const Title = styled.h4`
  margin-top: 0px;
  margin-bottom: 10px;
`;

const TasksContainer = styled.div`
  margin: 10px 0px;
`;

const Tasks = ({ tasks }) => {
  const renderTasks = ({ done }) => {
    if (!tasks || !tasks.length) return null;

    const doneTasks = tasks.filter((task) =>
      done ? task.finishedAt : !task.finishedAt
    );

    if (!doneTasks.length) return null;

    return (
      <TasksContainer>
        <Title>{done ? "Done" : "To do"}</Title>
        {doneTasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </TasksContainer>
    );
  };

  return (
    <Container>
      {tasks && tasks.length === 0 && "Task list is empty"}
      {renderTasks({ done: false })}
      {renderTasks({ done: true })}
    </Container>
  );
};

export default Tasks;
