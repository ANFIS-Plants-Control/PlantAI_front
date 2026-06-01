import { Route, Routes } from "react-router-dom";
import { AuthenticationPage } from "../../pages/Authentication/authentication";
import { MqttDashboard } from "../../pages/MqttDashboard/mqttDashboard";

export function Router() {
  return (
    <Routes>
      <Route path="/authentication" element={<AuthenticationPage />} />

      <Route path="/mqtt_clients" element={<MqttDashboard />} />
    </Routes>
  );
}
