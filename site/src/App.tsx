import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { Routes, Route } from "react-router-dom";
import { Navigation } from "./navigation/Navigation.component";
import { LandingPage } from "./landing-page/LandingPage.component";
import { Calculator } from "./calculator/Calculator.component";
import { Guide } from "./guide/Guide.component";
import { About } from "./about/About.component";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <h1>Loading</h1>
      </div>
    );
  }
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Wrapper>
            <Routes>
              <Route path="/" element={<Navigation />}>
                <Route index element={<LandingPage />} />
                <Route path="calculator" element={<Calculator />} />
                <Route path="guide" element={<Guide />} />
                <Route path="about" element={<About />} />
              </Route>
            </Routes>
          </Wrapper>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
