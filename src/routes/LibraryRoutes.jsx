import { lazy } from "react";
import { Route, Routes } from "react-router";
import EditAssetSidebar from "@/pages/library-sidebar/edit/EditAssetSidebar";
import NewAssetSidebar from "@/pages/library-sidebar/new/NewAssetSidebar";

const LibraryPage = lazy(() => import("@/pages/library/page"));

function LibraryRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LibraryPage />}>
        <Route index element={<></>} />
        <Route path="new" element={<NewAssetSidebar />} />
        <Route path=":assetId/edit" element={<EditAssetSidebar />} />
      </Route>
    </Routes>
  );
}

export default LibraryRoutes;
