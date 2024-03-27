import { withAuthenticationRequired } from "@auth0/auth0-react";
import { ComponentType } from "react";
import { PageBase } from "./components/PageBase";

interface Props {
  component: ComponentType<any>;
}

export const AuthGuard = ({ component }: Props) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <PageBase />,
  });

  return <Component />;
};
