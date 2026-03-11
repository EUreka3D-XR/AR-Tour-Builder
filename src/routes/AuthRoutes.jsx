import { Route, Routes } from "react-router-dom";
import ForgotPasswordPage from "@/pages/auth/forgot-password/page";
import HiddenLoginPage from "@/pages/auth/hidden/login/page";
import HiddenSignupPage from "@/pages/auth/hidden/signup/page";
import LoginPage from "@/pages/auth/login/page";
import AuthPage from "@/pages/auth/page";
import ResetPasswordPage from "@/pages/auth/reset-password/page";

function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="hidden/login" element={<HiddenLoginPage />} />
        <Route path="hidden/signup" element={<HiddenSignupPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
      </Route>
    </Routes>
  );
}

export default AuthRoutes;
