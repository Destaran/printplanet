import styled from "styled-components";
import { useSelector } from "react-redux";
import { currentUser } from "../../reduxStore/user/user.selector";
import { FormInput } from "../../components/FormInput/FormInput.component";
import { Button } from "../../components/Button/Button.component";
import { useState } from "react";
import { ChangePassPopup } from "../../components/Profile/ChangePassPopup/ChangePassPopup.component";

const Container = styled.div`
  margin: 0px auto;
  padding: 30px;
  width: 65%;
  height: 100%;
  background-color: #f1f1f1;
  user-select: none;
`;

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;

  button {
    margin: 10px 0 10px 0;
  }
`;

const Header = styled.h1`
  margin: 0 0 25px 0;
`;

export const Profile = () => {
  const user = useSelector(currentUser);
  const { displayName, email } = user;
  const [popup, setPopup] = useState(null);

  const handlePassPopup = () => {
    setPopup(true);
  };

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
        <Header>Profile</Header>
        <FormInput
          label="Display Name"
          value={displayName}
          type="text"
          color="grey"
          disabled
        />
        <FormInput
          label="E-mail"
          value={email}
          type="text"
          color="grey"
          disabled
        />
        <Button>Change E-mail</Button>
        <Button onClick={handlePassPopup}>Change Password</Button>
        {popup && <ChangePassPopup setPopup={setPopup} />}
      </DataContainer>
    </Container>
  );
};
