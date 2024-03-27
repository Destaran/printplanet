import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import styled from "styled-components";
import { AppRoutes } from "./AppRoutes";

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PageWrapper>
            <AppRoutes />
          </PageWrapper>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
};
