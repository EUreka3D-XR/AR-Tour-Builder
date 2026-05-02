import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import GuestRoute from "@/components/guards/GuestRoute";
import OuterLayout from "@/layouts/OuterLayout";
import AuthRoutes from "./AuthRoutes";
import DefaultRoutes from "./DefaultRoutes";

const DevPage = lazy(() => import("@/pages/dev/page"));

const EGICallbackPage = lazy(() => import("@/pages/auth/egi-login/page"));

const MobilePrivacyPolicyIndexPage = lazy(() => import("@/pages/mobile-privacy-policy/page"));
const PrivacyPolicyEnPage = lazy(() => import("@/pages/mobile-privacy-policy/en/page"));
const PrivacyPolicyFrPage = lazy(() => import("@/pages/mobile-privacy-policy/fr/page"));

const AccountSettingsPage = lazy(() => import("@/pages/account-settings/page"));

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
      {/* 👤 Account Settings */}
      <Route path="/account" element={<OuterLayout />}>
        <Route index element={<AccountSettingsPage />} />
      </Route>
      {/* 📁 Projects */}
      <Route path="/projects/*" element={<DefaultRoutes />} />
      {/* 🛠 Dev */}
      <Route path="/dev" element={<DevPage />} />
      {/* 📄 Privacy Policy (public) */}
      <Route path="/mobile-privacy-policy" element={<MobilePrivacyPolicyIndexPage />} />
      <Route path="/mobile-privacy-policy/en" element={<PrivacyPolicyEnPage />} />
      <Route path="/mobile-privacy-policy/fr" element={<PrivacyPolicyFrPage />} />
      {/* 404 - Not Found */}
      {/* <Route path="*" element={<Navigate to="/projects" replace />} /> */}
    </Routes>
  );
}

export default EurekaRoutes;
