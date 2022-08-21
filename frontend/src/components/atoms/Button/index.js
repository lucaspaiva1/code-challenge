import styled from "styled-components";

const CustomButton = styled.button`
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  border: none;
  padding: ${(props) => (props.sm ? "8px 10px" : "10px 20px")};
  border-radius: 6px;
  cursor: pointer;

  height: ${(props) => (props.sm ? "fit-content" : "auto")};

  :hover {
    background: #dbd9d8;
  }
`;

const Button = ({ children, ...props }) => {
  return <CustomButton {...props}>{children}</CustomButton>;
};

export default Button;
