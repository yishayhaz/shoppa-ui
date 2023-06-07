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
import { TextareaScreen } from "./screens/textarea";
import { TableScreen } from "./screens/table";
import { BadgeScreen } from "./screens/badge";
import { TooltipScreen } from "./screens/tooltip";
import { SelectScreen } from "./screens/select";
import { PopoverScreen } from "./screens/popover";
import { LinkScreen } from "./screens/link";
import { ComboxboxScreen } from "./screens/combobox";
import { PaginationScren } from "./screens/pagination";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/docs" element={<Layout />}>
          <Route path="alert" element={<AlertScreen />} />
          <Route path="badge" element={<BadgeScreen />} />
          <Route path="banner" element={<BannerScreen />} />
          <Route path="button" element={<ButtonScreen />} />
          <Route path="card" element={<CardScreen />} />
          <Route path="checkbox" element={<CheckboxScreen />} />
          <Route path="collapse" element={<CollapseScreen />} />
          <Route path="combobox" element={<ComboxboxScreen />} />
          <Route path="drawer" element={<DrawerScreen />} />
          <Route path="input" element={<InputScreen />} />
          <Route path="link" element={<LinkScreen />} />
          <Route path="pagination" element={<PaginationScren />} />
          <Route path="popover" element={<PopoverScreen />} />
          <Route path="popup" element={<PopupScreen />} />
          <Route path="radio" element={<RadioScreen />} />
          <Route path="select" element={<SelectScreen />} />
          <Route path="spinner" element={<SpinnerScreen />} />
          <Route path="table" element={<TableScreen />} />
          <Route path="textarea" element={<TextareaScreen />} />
          <Route path="tooltip" element={<TooltipScreen />} />
        </Route>
      </Routes>
    </Router>
  );
}
