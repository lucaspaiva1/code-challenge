import styled from "styled-components";

import LoginForm from "./../../components/molecules/LoginForm";
import RegisterForm from "./../../components/molecules/RegisterForm";
import Card from "../../components/atoms/Card";

const Container = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;

  > div {
    margin: 10px;
    min-width: 25%;
  }
`;

const LoginPage = () => {
  return (
    <Container>
      <Card>
        <LoginForm />
      </Card>
      <Card>
        <RegisterForm />
      </Card>
    </Container>
  );
};

export default LoginPage;
