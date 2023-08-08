import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../contexts/user.context";

const Container = styled.div`
  margin: 0px auto;
  padding: 30px;
  width: 80%;
  height: 100%;
  background-color: #f1f1f1;
  user-select: none;
`;

const Profile = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <Container>
      <h1>Welcome {currentUser.displayName}!</h1>
    </Container>
  );
};

export default Profile;
