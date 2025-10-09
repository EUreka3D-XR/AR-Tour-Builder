import { Outlet } from "react-router";
import { Divider, styled } from "@mui/material";

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
    </>
  );
}

export default TourPage;
