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

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Header = styled.h1`
  margin: 0 0 50px 0;
`;

export const Profile = () => {
  const user = useSelector(currentUser);
  const { displayName, email } = user;

  if (!user) {
    return (
      <Container>
        <Header>Loading...</Header>
      </Container>
    );
  }

  return (
    <Container>
      <DataContainer>
        <FormInput
          label="Display Name"
          name="displayName"
          value={displayName}
          type="text"
          color="grey"
          disabled
        />
        <FormInput
          label="E-mail"
          name="email"
          value={email}
          type="text"
          color="grey"
          disabled
        />
      </DataContainer>
    </Container>
  );
};
