import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { Layout } from "./layout";
import { ButtonScreen } from "./screens/button";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/docs" element={<Layout />}>
          <Route path="button" element={<ButtonScreen />} />
        </Route>
      </Routes>
    </Router>
  );
}
