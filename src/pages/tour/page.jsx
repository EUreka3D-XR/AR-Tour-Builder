import { Divider, styled } from "@mui/material";

import useHashTabs from "@/hooks/useHashTabs";
import TourHeaderSection from "./_sections/TourHeaderSection";
import TourInfoSection from "./_sections/TourInfoSection";
import TourMapSection from "./_sections/TourMapSection";
import TourNavigationTabsSection from "./_sections/TourNavigationTabsSection";
import TourPoisSection from "./_sections/TourPoisSection";

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
  const { activeHash } = useHashTabs();
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
      <TourNavigationTabsSection />
      <Divider />
      <div className="main-content">
        <div className="left-section">
          {activeHash === "info" && <TourInfoSection />}
          {activeHash === "pois" && (
            <TourPoisSection pois={initialTour?.pois} />
          )}
        </div>
        <TourMapSection />
      </div>
    </ContainerStyled>
  );
}

export default TourPage;
