import { Route, Routes } from "react-router";
import ViewPoiSidebar from "@/pages/poi-sidebar/[id]/ViewPoiSidebar";
import EditPoiSidebar from "@/pages/poi-sidebar/edit/EditPoiSidebar";
import NewPoiSidebar from "@/pages/poi-sidebar/new/NewPoiSidebar";
import TourPoisSection from "@/pages/tour/_sections/TourPoisSection";

function PoiRoutes() {
  return (
    <Routes>
      {/* <Route path="tours" element={<TourLayout />}> */}
      <Route path="/" element={<TourPoisSection />}>
        <Route index element={<></>} />
        <Route path="new" element={<NewPoiSidebar />} />
        <Route path=":poiId" element={<ViewPoiSidebar />} />
        <Route path=":poiId/edit" element={<EditPoiSidebar />} />

        {/* <Route path=":tourId/pois/:poiId" element={<></>} />
          <Route path=":tourId/pois/:poiId/edit" element={<></>} /> */}
      </Route>
    </Routes>
  );
}

export default PoiRoutes;
