import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./layout";
import { ButtonScreen } from "./screens/button";
import { InputScreen } from "./screens/input";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/docs" element={<Layout />}>
          <Route path="button" element={<ButtonScreen />} />
          <Route path="input" element={<InputScreen />} />
        </Route>
      </Routes>
    </Router>
  );
}
