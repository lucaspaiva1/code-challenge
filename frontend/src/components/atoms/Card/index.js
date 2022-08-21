import styled from "styled-components";

const Container = styled.div`
  background: #fff;
  border-radius: 6px;
  padding: 20px;
  box-sizing: border-box;
`;

const Card = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Card;
