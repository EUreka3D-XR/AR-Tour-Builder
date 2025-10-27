import { lazy } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router";

import ProjectLayout from "@/layouts/ProjectLayout";
import TourRoutes from "./TourRoutes";

// Placeholder layout components for grouping
const LibraryLayout = () => <Outlet />;

// Lazy-loaded page components
const ProjectPage = lazy(() => import("@/pages/dashboard/container"));
const LibraryPage = lazy(() => import("@/pages/library/page"));

function ProjectRoutes() {
  return (
    <Routes>
      {/* 🏠 Project Dashboard */}
      <Route path="/" element={<ProjectLayout />}>
        {/* Redirect from /projects/{id} to /projects/{id}/dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<ProjectPage />} />
        <Route path="edit" element={<></>} />
        {/* 🗺️ Tours */}
        <Route path="tours/*" element={<TourRoutes />} />
        {/* 📚 Library */}
        <Route path="library" element={<LibraryLayout />}>
          <Route index element={<LibraryPage />} />
          <Route path="new" element={<></>} />
          <Route path=":assetId" element={<></>} />
          <Route path=":assetId/edit" element={<></>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default ProjectRoutes;
