import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { App } from "./App";

const root = document.getElementById("root");

if (!root) {
  throw new Error("No root element found");
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-7mjq6hdbmvzm1sfu.us.auth0.com"
      clientId="9VhsadF5PMSEqqPZ5PsfPiLWnfosfHDM"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
