// @ts-nocheck

import styled from "styled-components";
import { useSelector } from "react-redux";
import { currentUser } from "../../reduxStore/user/user.selector";
import { FormInput } from "../../components/FormInput/FormInput.component";
import { Button } from "../../components/Button/Button.component";
import { useState } from "react";
import { ChangePassPopup } from "../../components/Profile/ChangePassPopup/ChangePassPopup.component";
import { User } from "../../utils/types";
import { ChangeEmailPopup } from "../../components/Profile/ChangeEmailPopup/ChangeEmailPopup.component";

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
  if (!user) {
    return (
      <Container>
        <Header>Loading...</Header>
      </Container>
    );
  }

  const { displayName, email, createdAt } = user;
  const [passPopup, setPassPopup] = useState<Popup>(false);
  const [emailPopup, setEmailPopup] = useState<Popup>(false);

  const getCreationDate = (unixTimestamp: number) => {
    const date = new Date(unixTimestamp);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleEmailPopup = () => {
    setEmailPopup(true);
  };

  const handlePassPopup = () => {
    setPassPopup(true);
  };

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
        <MemberSince>Member since: {getCreationDate(createdAt)}</MemberSince>
        <Button onClick={handleEmailPopup}>Change E-mail</Button>
        {emailPopup && (
          <ChangeEmailPopup setEmailPopup={setEmailPopup} email={email} />
        )}
        <Button onClick={handlePassPopup}>Change Password</Button>
        {passPopup && (
          <ChangePassPopup setPassPopup={setPassPopup} email={email} />
        )}
      </DataContainer>
    </Container>
  );
};
