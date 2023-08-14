import styled from "styled-components";
import { useSelector } from "react-redux";
import { currentUser } from "../../reduxStore/user/user.selector";

const Container = styled.div`
  display: flex;
  margin: 0px auto;
  padding: 30px;
  width: 85%;
  height: 100%;
  background-color: #f1f1f1;
  user-select: none;
`;

export const Profile = () => {
  const user = useSelector(currentUser);

  if (!user) {
    return (
      <Container>
        <h1>Loading...</h1>
      </Container>
    );
  }

  return (
    <Container>
      <h1>Welcome {user.displayName}!</h1>
    </Container>
  );
};
