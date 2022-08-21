import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 14px;
`;

const CustomInput = styled.input`
  width: 100%;
  font-size: 16px;
  padding: 5px;
  margin-bottom: 10px;
  border: 1.5px solid #dbd9d8;
  border-radius: 6px;
  box-sizing: border-box;
`;

const Input = ({ label, value, setValue, name, ...props }) => {
  return (
    <Container>
      <Label for={`input_${name}`}>{label}</Label>
      <CustomInput
        id={`input_${name}`}
        name={name}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        {...props}
      />
    </Container>
  );
};

export default Input;
