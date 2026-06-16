import { Route, Routes } from "react-router-dom";
import { AuthenticationPage } from "../../pages/Authentication/authentication";
import { ControlPanel } from "../../pages/ControlPanel/panel";
import { Main } from "../../pages/Main/Main";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />

      <Route path="/authentication" element={<AuthenticationPage />} />

      <Route path="/control_panel" element={<ControlPanel />} />
    </Routes>
  );
}
