import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./layout";
import { ButtonScreen } from "./screens/button";
import { InputScreen } from "./screens/input";
import { AlertScreen } from "./screens/alert";
import { DrawerScreen } from "./screens/drawer";
import { CollapseScreen } from "./screens/collapse";
import { SpinnerScreen } from "./screens/spinner";
import { BannerScreen } from "./screens/banner";
import { CheckboxScreen } from "./screens/checkbox";
import { RadioScreen } from "./screens/radio";
import { PopupScreen } from "./screens/popup";
import { CardScreen } from "./screens/card";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/docs" element={<Layout />}>
          <Route path="alert" element={<AlertScreen />} />
          <Route path="banner" element={<BannerScreen />} />
          <Route path="button" element={<ButtonScreen />} />
          <Route path="card" element={<CardScreen />} />
          <Route path="checkbox" element={<CheckboxScreen />} />
          <Route path="collapse" element={<CollapseScreen />} />
          <Route path="drawer" element={<DrawerScreen />} />
          <Route path="input" element={<InputScreen />} />
          <Route path="popup" element={<PopupScreen />} />
          <Route path="radio" element={<RadioScreen />} />
          <Route path="spinner" element={<SpinnerScreen />} />
        </Route>
      </Routes>
    </Router>
  );
}
