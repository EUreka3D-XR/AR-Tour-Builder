import { lazy } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router";
import ToursPage from "@/pages/tours/page";

import ProjectLayout from "@/layouts/ProjectLayout";

// Placeholder layout components for grouping
const TourLayout = () => <Outlet />;
const POILayout = () => <Outlet />;
const LibraryLayout = () => <Outlet />;

// Lazy-loaded page components
const ProjectPage = lazy(() => import("@/pages/dashboard/page"));
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
        <Route path="tours" element={<TourLayout />}>
          <Route index element={<ToursPage />} />
          <Route path="new" element={<></>} />
          <Route path=":tourId" element={<></>} />
          <Route path=":tourId/edit" element={<></>} />
          <Route path=":tourId/poi/:poiId" element={<></>} />
          <Route path=":tourId/poi/:poiId/edit" element={<></>} />
        </Route>

        {/* 📍 POIs */}
        <Route path="pois" element={<POILayout />}>
          <Route index element={<></>} />
          <Route path=":poiId" element={<></>} />
        </Route>

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
