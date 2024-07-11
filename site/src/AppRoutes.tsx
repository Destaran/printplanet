import { Configurator } from "./configurator/Configurator";
import { AuthGuard } from "./AuthGuard";
import { About } from "./about/About.component";
import { Calculator } from "./calculator/Calculator";
import { Guide } from "./guide/Guide";
import { LandingPage } from "./landing-page/LandingPage";
import { Navigation } from "./navigation/Navigation";
import { Profile } from "./profile/Profile";
import { Route, Routes } from "react-router-dom";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<LandingPage />} />
        <Route path="guide" element={<Guide />} />
        <Route path="configurator" element={<Configurator />} />
        <Route path="calculator" element={<Calculator />} />
        <Route path="about" element={<About />} />
        <Route path="profile" element={<AuthGuard component={Profile} />} />
      </Route>
    </Routes>
  );
}
