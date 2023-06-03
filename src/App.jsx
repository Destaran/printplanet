import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/user.context";
import { Provider } from "react-redux";
import { store } from "./reduxStore/store";
import { Routes, Route } from "react-router-dom";

import Navigation from "./routes/Navigation/Navigation.component";
import Home from "./routes/Home/Home.component";
import Login from "./routes/Login/Login.component";
import Registration from "./routes/Register/Registration.component";
import ForgotPassword from "./routes/ForgotPassword/ForgotPassword.component";
import Profile from "./routes/Profile/Profile.component";
import Calculator from "./routes/Calculator/Calculator.component";

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Navigation />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="registration" element={<Registration />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="profile" element={<Profile />} />
              <Route path="calculator" element={<Calculator />} />
            </Route>
          </Routes>
        </Provider>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
