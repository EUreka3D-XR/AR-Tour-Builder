import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import NewProjectPage from "@/pages/projects/new/page";

import { AvailableLocalesProvider } from "@/providers/locales/AvailableLocalesProvider";
import OuterLayout from "@/layouts/OuterLayout";

// Placeholder layout components for grouping

const ProjectsPage = lazy(() => import("@/pages/projects/page"));
const ProjectRoutes = lazy(() => import("./ProjectRoutes"));

function DefaultRoutes() {
  return (
    <Routes>
      {/* 📁 Projects */}
      <Route path="/" element={<OuterLayout />}>
        <Route index element={<ProjectsPage />} />
        <Route
          path="new"
          element={
            <AvailableLocalesProvider>
              <NewProjectPage />
            </AvailableLocalesProvider>
          }
        />
        {/* All project-specific routes delegated to ProjectRoutes */}
        <Route
          path=":projectId/*"
          element={
            <AvailableLocalesProvider>
              <ProjectRoutes />
            </AvailableLocalesProvider>
          }
        />
      </Route>
    </Routes>
  );
}

export default DefaultRoutes;
