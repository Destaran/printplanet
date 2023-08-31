import styled from "styled-components";
import { useSelector } from "react-redux";
import { currentUser } from "../../reduxStore/user/user.selector";
import { FormInput } from "../../components/FormInput/FormInput.component";
import { Button } from "../../components/Button/Button.component";
import { useState } from "react";
import { ChangePassPopup } from "../../components/Profile/ChangePassPopup/ChangePassPopup.component";
import { User } from "../../utils/types";

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

const MemberSince = styled.p`
  margin: 0;
`;

type Popup = boolean;

export const Profile = () => {
  const user: User = useSelector(currentUser);
  const { displayName, email, createdAt } = user;
  const [popup, setPopup] = useState<Popup>(false);

  const getMemberSince = (unixTimestamp: number) => {
    const date = new Date(unixTimestamp);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
        <MemberSince>Member since: {getMemberSince(createdAt)}</MemberSince>
        <Button>Change E-mail</Button>
        <Button onClick={handlePassPopup}>Change Password</Button>
        {popup && <ChangePassPopup setPopup={setPopup} />}
      </DataContainer>
    </Container>
  );
};
