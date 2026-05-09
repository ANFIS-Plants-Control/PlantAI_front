import { Route, Routes } from "react-router-dom";
import { AuthenticationPage } from "../../pages/Authentication/authentication";

export function Router() {
  return (
    <Routes>
      <Route path="/authentication" element={<AuthenticationPage />} />

      <Route path="*" />
    </Routes>
  );
}
