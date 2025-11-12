import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router";

import { ProjectProvider } from "@/providers/project/ProjectProvider";
import ProjectLayout from "@/layouts/ProjectLayout";
import LibraryRoutes from "./LibraryRoutes";
import TourRoutes from "./TourRoutes";

// Lazy-loaded page components
const ProjectPage = lazy(() => import("@/pages/dashboard/container"));

function ProjectRoutes() {
  return (
    <ProjectProvider>
      <Routes>
        {/* 🏠 Project Dashboard */}
        <Route path="/" element={<ProjectLayout />}>
          {/* Redirect from /projects/{id} to /projects/{id}/dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<ProjectPage />} />
          <Route path="edit" element={<></>} />
          <Route path="tours/*" element={<TourRoutes />} />
          <Route path="library/*" element={<LibraryRoutes />} />
        </Route>
      </Routes>
    </ProjectProvider>
  );
}

export default ProjectRoutes;
