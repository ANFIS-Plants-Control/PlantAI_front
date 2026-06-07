import { Route, Routes } from "react-router-dom";
import { AuthenticationPage } from "../../pages/Authentication/authentication";
import { MqttControlPanel } from "../../pages/MqttControlPanel/panel";

export function Router() {
  return (
    <Routes>
      <Route path="/authentication" element={<AuthenticationPage />} />

      <Route path="/mqtt_panel" element={<MqttControlPanel />} />
    </Routes>
  );
}
