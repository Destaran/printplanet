import styled from "styled-components";
import { useSelector } from "react-redux";
import { currentUser } from "../../reduxStore/user/user.selector";
import { FormInput } from "../../components/FormInput/FormInput.component";

const Container = styled.div`
  margin: 0px auto;
  padding: 30px;
  width: 85%;
  height: 100%;
  background-color: #f1f1f1;
  user-select: none;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

export const Profile = () => {
  const user = useSelector(currentUser);
  const { displayName, email } = user;

  if (!user) {
    return (
      <Container>
        <h1>Loading...</h1>
      </Container>
    );
  }

  return (
    <Container>
      <h1>Profile</h1>
      <ProfileContainer>
        <FormInput
          label="Display Name"
          name="displayName"
          value={displayName}
          type="text"
          disabled
        />
        <FormInput
          label="E-mail"
          name="email"
          value={email}
          type="text"
          disabled
        />
      </ProfileContainer>
    </Container>
  );
};
