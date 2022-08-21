import styled from "styled-components";
import { userService } from "../../../services/user";
import { useAuth } from "../../../providers/auth";
import Button from "../../atoms/Button";

const Container = styled.header`
  padding: 20px;
  background-color: #fff;
`;

const Content = styled.div`
  max-width: 1320px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.span`
  color: #2e2925;
  font-weight: 600;
`;

const UserName = styled.span`
  color: #2e2925;
  margin-right: 10px;
`;

const Header = () => {
  const { user, setUser } = useAuth();

  const onLogout = () => {
    userService.logout();
    setUser(null);
  };

  return (
    <Container>
      <Content>
        <Title>TODO List</Title>
        {user && (
          <div>
            <UserName>{user.fullName}</UserName>
            <Button onClick={onLogout}>Logout</Button>
          </div>
        )}
      </Content>
    </Container>
  );
};

export default Header;
