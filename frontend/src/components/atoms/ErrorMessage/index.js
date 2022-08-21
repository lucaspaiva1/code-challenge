import styled from "styled-components";

const Container = styled.div`
  height: 20px;
  font-size: 14px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
`;

const ErrorMessage = ({ children }) => {
  return <Container>{children}</Container>;
};

export default ErrorMessage;
