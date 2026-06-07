import { Route, Routes } from "react-router-dom";
import { AuthenticationPage } from "../../pages/Authentication/authentication";
import { ControlPanel } from "../../pages/ControlPanel/panel";

export function Router() {
  return (
    <Routes>
      <Route path="/authentication" element={<AuthenticationPage />} />

      <Route path="/control_panel" element={<ControlPanel />} />
    </Routes>
  );
}
