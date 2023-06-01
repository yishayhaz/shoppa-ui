import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./layout";
import { ButtonScreen } from "./screens/button";
import { InputScreen } from "./screens/input";
import { AlertScreen } from "./screens/alert";
import { DrawerScreen } from "./screens/drawer";
import { CollapseScreen } from "./screens/collapse";
import { SpinnerScreen } from "./screens/spinner";
import { BannerScreen } from "./screens/banner";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/docs" element={<Layout />}>
          <Route path="alert" element={<AlertScreen />} />
          <Route path="banner" element={<BannerScreen />} />
          <Route path="button" element={<ButtonScreen />} />
          <Route path="collapse" element={<CollapseScreen />} />
          <Route path="drawer" element={<DrawerScreen />} />
          <Route path="input" element={<InputScreen />} />
          <Route path="spinner" element={<SpinnerScreen />} />
        </Route>
      </Routes>
    </Router>
  );
}
