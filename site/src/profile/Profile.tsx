import { useAuth0 } from "@auth0/auth0-react";
import { PageBase } from "../components/PageBase";

export const Profile = () => {
  const { user } = useAuth0();

  if (!user) {
    return null;
  }
  console.log(user);

  return (
    <PageBase>
      <h1>Hi {user.nickname}!</h1>
    </PageBase>
  );
};
