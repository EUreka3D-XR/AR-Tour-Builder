import { Navigate, Outlet, Route, Routes } from "react-router";
import TourInfoSection from "@/pages/tour/_sections/TourInfoSection";
import NewTourPageContainer from "@/pages/tour/[id]/container";
import TourPageContainer from "@/pages/tour/container";
import ToursPage from "@/pages/tours/page";

import PoiRoutes from "./PoiRoutes";

const TourLayout = () => <Outlet />;

function TourRoutes() {
  return (
    <Routes>
      {/* <Route path="tours" element={<TourLayout />}> */}
      <Route path="/" element={<TourLayout />}>
        <Route index element={<ToursPage />} />
        <Route path="new/*" element={<NewTourPageContainer />}>
          <Route index element={<Navigate to="info" replace />} />
          <Route path="info" element={<TourInfoSection />} />
          <Route path="pois/*" element={<PoiRoutes />} />
        </Route>
        <Route path=":tourId/*" element={<TourPageContainer />}>
          {/* Redirect /tours/:tourId to /tours/:tourId/info by default */}
          <Route index element={<Navigate to="info" replace />} />
          <Route path="info" element={<TourInfoSection />} />
          <Route path="pois/*" element={<PoiRoutes />} />
        </Route>
        {/* <Route path=":tourId/pois/:poiId" element={<></>} />
          <Route path=":tourId/pois/:poiId/edit" element={<></>} /> */}
      </Route>
    </Routes>
  );
}

export default TourRoutes;
