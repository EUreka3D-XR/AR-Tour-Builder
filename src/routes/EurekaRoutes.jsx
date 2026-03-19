import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import GuestRoute from "@/components/guards/GuestRoute";
import AuthRoutes from "./AuthRoutes";
import DefaultRoutes from "./DefaultRoutes";

const DevPage = lazy(() => import("@/pages/dev/page"));

const EGICallbackPage = lazy(() => import("@/pages/auth/egi-login/page"));

function EurekaRoutes() {
  return (
    <Routes>
      {/* 🔐 Auth - only for guests */}
      <Route
        path="/auth/*"
        element={
          <GuestRoute>
            <AuthRoutes />
          </GuestRoute>
        }
      />
      {/* EGI Check-in callback — must be outside GuestRoute */}
      <Route
        path="/egi-login"
        element={
          <GuestRoute>
            <EGICallbackPage />
          </GuestRoute>
        }
      />
      {/* Default Home */}
      <Route path="/" element={<Navigate to="/projects" replace />} />
      {/* 📁 Projects */}
      <Route path="/projects/*" element={<DefaultRoutes />} />
      {/* 🛠 Dev */}
      <Route path="/dev" element={<DevPage />} />
      {/* 404 - Not Found */}
      {/* <Route path="*" element={<Navigate to="/projects" replace />} /> */}
    </Routes>
  );
}

export default EurekaRoutes;
