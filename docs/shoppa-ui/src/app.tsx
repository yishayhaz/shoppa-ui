import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./layout";
import { ButtonScreen } from "./screens/button";
import { InputScreen } from "./screens/input";
import { AlertScreen } from "./screens/alert";
import { DrawerScreen } from "./screens/drawer";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/docs" element={<Layout />}>
          <Route path="alert" element={<AlertScreen />} />
          <Route path="button" element={<ButtonScreen />} />
          <Route path="drawer" element={<DrawerScreen />} />
          <Route path="input" element={<InputScreen />} />
        </Route>
      </Routes>
    </Router>
  );
}
