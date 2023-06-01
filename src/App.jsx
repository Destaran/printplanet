import "./index.scss";

import { Routes, Route } from 'react-router-dom';

import Login from './routes/Login/Login.component';
import Registration from './routes/Register/Registration.component';
import Navigation from "./routes/Navigation/Navigation.component";
import Home from './routes/Home/Home.component';
import Calculator from './routes/Calculator/Calculator.component';
import Profile from "./routes/Profile/Profile.component";
import ForgotPassword from "./routes/ForgotPassword/ForgotPassword.component";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route index element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='registration' element={<Registration />} />
        <Route path='forgot-password' element={<ForgotPassword />} />
        <Route path='profile' element={<Profile />} />
        <Route path='calculator' element={<Calculator />} />
      </Route>
    </Routes>
  )
}

export default App;