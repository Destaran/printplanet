import { useAuth0 } from "@auth0/auth0-react";
import { PageBase } from "../components/PageBase";

export function Profile() {
  const { user } = useAuth0();

  if (!user) {
    return null;
  }

  return (
    <PageBase>
      <h1>Hi {user.nickname}!</h1>
    </PageBase>
  );
}
