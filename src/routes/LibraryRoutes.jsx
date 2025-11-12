import { lazy } from "react";
import { Outlet, Route, Routes } from "react-router";
import EditAssetSidebar from "@/pages/library-sidebar/edit/EditAssetSidebar";
import NewAssetSidebar from "@/pages/library-sidebar/new/NewAssetSidebar";
import ViewLibraryAssetPage from "@/pages/library/[id]/page";

const LibraryPage = lazy(() => import("@/pages/library/page"));
const LibraryLayout = () => <Outlet />;

function LibraryRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LibraryLayout />}>
        <Route index element={<LibraryPage />} />
        <Route path="new" element={<NewAssetSidebar />} />
        <Route path=":assetId" element={<ViewLibraryAssetPage />} />
        <Route path=":assetId/edit" element={<EditAssetSidebar />} />
      </Route>
    </Routes>
  );
}

export default LibraryRoutes;
