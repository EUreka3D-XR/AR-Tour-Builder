import { lazy } from "react";
import { Outlet, Route, Routes } from "react-router";

const LibraryPage = lazy(() => import("@/pages/library/page"));
const LibraryLayout = () => <Outlet />;

function LibraryRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LibraryLayout />}>
        <Route index element={<LibraryPage />} />
        <Route path="new" element={<></>} />
        <Route path=":assetId" element={<></>} />
        <Route path=":assetId/edit" element={<></>} />
      </Route>
    </Routes>
  );
}

export default LibraryRoutes;
