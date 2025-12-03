import { Navigate, Route, Routes } from "react-router-dom";

import AuthRoutes from "./AuthRoutes";
import DefaultRoutes from "./DefaultRoutes";

function EurekaRoutes() {
  return (
    <Routes>
      {/* 🔐 Auth */}
      <Route path="/auth/*" element={<AuthRoutes />} />
      {/* Default Home */}
      <Route path="/" element={<Navigate to="/projects" replace />} />
      {/* 📁 Projects */}
      <Route path="/projects/*" element={<DefaultRoutes />} />
      {/* 404 - Not Found */}
      {/* <Route path="*" element={<Navigate to="/projects" replace />} /> */}
    </Routes>
  );
}

export default EurekaRoutes;
