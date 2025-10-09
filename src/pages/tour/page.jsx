import { Outlet, Route, Routes, useLocation } from "react-router";
import { Divider, styled } from "@mui/material";

import useNavPaths from "@/hooks/useNavPaths";
import BasePoiSidebar from "../poi-sidebar/_common/sidebar";
import TourHeaderSection from "./_sections/TourHeaderSection";
import TourMapSection from "./_sections/TourMapSection";
import TourNavigationTabsSection from "./_sections/TourNavigationTabsSection";

const ContainerStyled = styled("div")(() => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  "& .main-content": {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    overflow: "hidden",
    "& .left-section": {
      height: "100%",
      overflow: "hidden",
    },
  },
}));

/**
 *
 * @param {Object} props
 * @param {'new'|'edit'} props.mode
 * @returns {React.ReactElement}
 */
function TourPage({ initialTour, onSave, onPublish, onArchive }) {
  const { routes } = useNavPaths();
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  return (
    <>
      <ContainerStyled>
        <TourHeaderSection
          tourTitle={initialTour?.title.locales.en}
          tourStatus={initialTour?.status}
          lastModified={initialTour?.lastModified}
          onSave={onSave}
          onPublish={onPublish}
          onArchive={onArchive}
        />
        <TourNavigationTabsSection />
        <Divider />
        <div className="main-content">
          <div className="left-section">
            <Outlet context={{ pois: initialTour?.pois }} />
          </div>
          <TourMapSection />
        </div>
      </ContainerStyled>
      {backgroundLocation && (
        <Routes location={backgroundLocation}>
          <Route path={"/:poiId"} element={<BasePoiSidebar />} />
          <Route path={routes.pois.new} element={<BasePoiSidebar />} />
        </Routes>
      )}
    </>
  );
}

export default TourPage;
