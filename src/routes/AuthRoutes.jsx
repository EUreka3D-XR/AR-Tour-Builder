import { Outlet, Route, Routes } from "react-router-dom";

// Placeholder layout components for grouping

const AuthLayout = () => <Outlet />;

function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="login" element={<></>} />
        <Route path="signup" element={<></>} />
        <Route path="forgot-password" element={<></>} />
        <Route path="reset-password" element={<></>} />
      </Route>
    </Routes>
  );
}

export default AuthRoutes;
