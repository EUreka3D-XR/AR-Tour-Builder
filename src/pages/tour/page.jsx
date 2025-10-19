import { Outlet } from "react-router";
import { Divider, styled } from "@mui/material";

import TourHeaderSection from "./_sections/TourHeaderSection";
import TourNavigationTabsSection from "./_sections/TourNavigationTabsSection";
import TourPoisMapSection from "./_sections/TourPoisMapSection";

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
    "& .right-section": {
      flex: 1,
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
          <div className="right-section">
            <TourPoisMapSection
              tourBoundBox={initialTour?.boundBox}
              pois={initialTour?.pois}
            />
          </div>
        </div>
      </ContainerStyled>
    </>
  );
}

export default TourPage;
