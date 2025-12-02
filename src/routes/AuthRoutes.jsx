import { Route, Routes } from "react-router-dom";
import ForgotPasswordPage from "@/pages/auth/forgot-password/page";
import LoginPage from "@/pages/auth/login/page";
import AuthPage from "@/pages/auth/page";
import ResetPasswordPage from "@/pages/auth/reset-password/page";
import SignupPage from "@/pages/auth/signup/page";

function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
      </Route>
    </Routes>
  );
}

export default AuthRoutes;
