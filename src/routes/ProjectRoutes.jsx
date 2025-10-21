import { lazy } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router";
import EditPoiSidebar from "@/pages/poi-sidebar/edit/EditPoiSidebar";
import TourInfoSection from "@/pages/tour/_sections/TourInfoSection";
import TourPoisSection from "@/pages/tour/_sections/TourPoisSection";
import NewTourPageContainer from "@/pages/tour/[id]/container";
import TourPageContainer from "@/pages/tour/container";
import ToursPage from "@/pages/tours/page";

import ProjectLayout from "@/layouts/ProjectLayout";

// Placeholder layout components for grouping
const TourLayout = () => <Outlet />;
const POILayout = () => <Outlet />;
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
        <Route path="tours" element={<TourLayout />}>
          <Route index element={<ToursPage />} />
          <Route path="new/*" element={<NewTourPageContainer />}>
            <Route index element={<Navigate to="info" replace />} />
            <Route path="info" element={<TourInfoSection />} />
            <Route path="pois/*" element={<TourPoisSection />}>
              <Route index element={<></>} />
              <Route path=":poiId" element={<EditPoiSidebar />} />
            </Route>
          </Route>
          <Route path=":tourId/*" element={<TourPageContainer />}>
            {/* Redirect /tours/:tourId to /tours/:tourId/info by default */}
            <Route index element={<Navigate to="info" replace />} />
            <Route path="info" element={<TourInfoSection />} />
            <Route path="pois/*" element={<TourPoisSection />}>
              <Route index element={<></>} />
              <Route path=":poiId" element={<EditPoiSidebar />} />
            </Route>
          </Route>
          {/* <Route path=":tourId/pois/:poiId" element={<></>} />
          <Route path=":tourId/pois/:poiId/edit" element={<></>} /> */}
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
