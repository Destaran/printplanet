import { withAuthenticationRequired } from "@auth0/auth0-react";
import { ComponentType } from "react";

interface Props {
  component: ComponentType<any>;
}

export const AuthGuard = ({ component }: Props) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      // TODO: add loader
      <div className="page-layout">
        <h1>Loading</h1>
      </div>
    ),
  });

  return <Component />;
};
