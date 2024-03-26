import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { Routes, Route } from "react-router-dom";
import { Navigation } from "./navigation/Navigation";
import { LandingPage } from "./landing-page/LandingPage.component";
import { Calculator } from "./calculator/Calculator";
import { Guide } from "./guide/Guide";
import { About } from "./about/About.component";
import styled from "styled-components";
import { Profile } from "./profile/Profile";
import { AuthGuard } from "./AuthGuard";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Wrapper>
            <Routes>
              <Route path="/" element={<Navigation />}>
                <Route index element={<LandingPage />} />
                <Route path="guide" element={<Guide />} />
                <Route path="calculator" element={<Calculator />} />
                <Route path="about" element={<About />} />
                <Route
                  path="profile"
                  element={<AuthGuard component={Profile} />}
                />
              </Route>
            </Routes>
          </Wrapper>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
};
