import Projects from "./../../components/molecules/Projects";
import CreateProjectForm from "./../../components/molecules/CreateProjectForm";
import Card from "../../components/atoms/Card";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;

  > div {
    &:first-child {
      width: 70%;
      padding-right: 10px;
    }
    &:last-child {
      width: 30%;
    }
  }

  @media (max-width: 900px) {
    flex-direction: column-reverse;
    > div {
      &:first-child {
        width: 100%;
        padding-right: 0px;
      }
      &:last-child {
        width: 100%;
        margin-bottom: 20px;
      }
    }
  }
`;

const MainPage = () => {
  return (
    <Container>
      <Projects className="projectList"></Projects>
      <Card>
        <CreateProjectForm />
      </Card>
    </Container>
  );
};

export default MainPage;
