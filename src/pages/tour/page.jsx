import { Divider, styled } from "@mui/material";

import TourHeaderSection from "./_sections/TourHeaderSection";
import TourInfoSection from "./_sections/TourInfoSection";
import TourMapSection from "./_sections/TourMapSection";
import TourNavigationSection from "./_sections/TourNavigationSection";

const ContainerStyled = styled("div")(() => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  "& .main-content": {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
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
    <ContainerStyled>
      <TourHeaderSection
        tourTitle={initialTour?.title.locales.en}
        tourStatus={initialTour?.status}
        lastModified={initialTour?.lastModified}
        onSave={onSave}
        onPublish={onPublish}
        onArchive={onArchive}
      />
      <TourNavigationSection />
      <Divider />
      <div className="main-content">
        <div className="left-section">
          <TourInfoSection />
        </div>
        <TourMapSection />
      </div>
    </ContainerStyled>
  );
}

export default TourPage;
