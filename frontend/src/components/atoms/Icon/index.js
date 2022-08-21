import styled from "styled-components";

const Content = styled.img`
  height: 18px;
  width: 18px;
`;

const Icon = ({ name, ...rest }) => {
  return <Content src={`/assets/icons/${name}.svg`} alt={name} {...rest} />;
};

export default Icon;
