import { lazy } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

// Placeholder layout components for grouping
const AuthLayout = () => <Outlet />;
const ProjectsLayout = () => <Outlet />;

const ProjectsPage = lazy(() => import("@/pages/projects/page"));
const ProjectRoutes = lazy(() => import("./ProjectRoutes"));

function EurekaRoutes() {
  return (
    <Routes>
      {/* 🔐 Auth */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<></>} />
        <Route path="signup" element={<></>} />
        <Route path="forgot-password" element={<></>} />
        <Route path="reset-password" element={<></>} />
      </Route>
      {/* Default Home */}
      <Route path="/" element={<Navigate to="/projects" replace />} />
      {/* 📁 Projects */}
      <Route path="/projects" element={<ProjectsLayout />}>
        <Route index element={<ProjectsPage />} />
        <Route path="new" element={<></>} />
        {/* All project-specific routes delegated to ProjectRoutes */}
        <Route path=":projectId/*" element={<ProjectRoutes />} />
      </Route>
    </Routes>
  );
}

export default EurekaRoutes;
