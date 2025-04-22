import { Outlet, Route, Routes } from "react-router-dom";

// Placeholder layout components for grouping
const AuthLayout = () => <Outlet />;
const ProjectLayout = () => <Outlet />;
const TourLayout = () => <Outlet />;
const POILayout = () => <Outlet />;
const LibraryLayout = () => <Outlet />;

function RoutesLayout() {
  return (
    <Routes>
      {/* 🔐 Auth */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<></>} />
        <Route path="signup" element={<></>} />
        <Route path="forgot-password" element={<></>} />
        <Route path="reset-password" element={<></>} />
      </Route>

      {/* 📁 Projects */}
      <Route path="/projects" element={<ProjectLayout />}>
        <Route index element={<></>} />
        <Route path="new" element={<></>} />
        <Route path=":projectId" element={<></>} />
        <Route path=":projectId/edit" element={<></>} />
        {/* 🗺️ Tours */}
        <Route path=":projectId/tours" element={<TourLayout />}>
          <Route index element={<></>} />
          <Route path="new" element={<></>} />
          <Route path=":tourId" element={<></>} />
          <Route path=":tourId/edit" element={<></>} />
          <Route path=":tourId/poi/:poiId" element={<></>} />
          <Route path=":tourId/poi/:poiId/edit" element={<></>} />
        </Route>
        {/* 📍 POIs */}
        <Route path=":projectId/pois" element={<POILayout />}>
          <Route index element={<></>} />
          <Route path=":poiId" element={<></>} />
        </Route>
        {/* 📚 Library */}
        <Route path=":projectId/library" element={<LibraryLayout />}>
          <Route index element={<></>} />
          <Route path="new" element={<></>} />
          <Route path=":assetId" element={<></>} />
          <Route path=":assetId/edit" element={<></>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default RoutesLayout;
