import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./reduxStore/store";
import { Routes, Route } from "react-router-dom";
import { Navigation } from "./routes/Navigation/Navigation.component";
import { Home } from "./routes/Home/Home.component";
import { Login } from "./routes/Login/Login.component";
import { Registration } from "./routes/Register/Registration.component";
import { ForgotPassword } from "./routes/ForgotPassword/ForgotPassword.component";
import { Profile } from "./routes/Profile/Profile.component";
import { Calculator } from "./routes/Calculator/Calculator.component";
import { Guide } from "./routes/Guide/Guide.component";
import { About } from "./routes/About/About.component";

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route path="/" element={<Navigation />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="registration" element={<Registration />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="profile" element={<Profile />} />
              <Route path="calculator" element={<Calculator />} />
              <Route path="guide" element={<Guide />} />
              <Route path="about" element={<About />} />
            </Route>
          </Routes>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
