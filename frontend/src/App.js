import styled from "styled-components";
import React from "react";
import { useAuth } from "./providers/auth";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import Header from "./components/molecules/Header";

const Container = styled.section`
  background-color: #f5f6fa;
`;

const Content = styled.section`
  max-width: 1320px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: #f5f6fa;
  padding: 20px;
`;

function App() {
  const { user } = useAuth();

  return (
    <>
      <Header />
      <Container>
        <Content>
          {!user && <LoginPage />}
          {user && <MainPage />}
        </Content>
      </Container>
    </>
  );
}

export default App;
