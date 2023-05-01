import "./index.scss";

import { Routes, Route } from 'react-router-dom';

import Login from './routes/Login/Login.component';
import Registration from './routes/Register/Registration.component';
import Navigation from "./routes/Navigation/Navigation.component";
import Home from './routes/Home/Home.component';
import Calculator from './routes/Calculator/Calculator.component';
import Blueprints from './routes/Blueprints/Blueprints.component';
import Profile from "./routes/Profile/Profile.component";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route index element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='profile' element={<Profile />} />
        <Route path='registration' element={<Registration />} />
        <Route path='calculator' element={<Calculator />} />
        <Route path='blueprints' element={<Blueprints />} />
      </Route>
    </Routes>
  )
}

export default App;