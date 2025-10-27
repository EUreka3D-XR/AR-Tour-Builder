import { useRef } from "react";
import { Outlet, useParams } from "react-router";
import { Divider, styled } from "@mui/material";

import TourHeaderSection from "../_sections/TourHeaderSection";
import TourNavigationTabsSection from "../_sections/TourNavigationTabsSection";
import TourPoisMapSection from "../_sections/TourPoisMapSection";

const ContainerStyled = styled("div")(() => ({
  height: "100%",
  "& form": {
    height: "100%",
  },
  "& .tour-form-inner": {
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
  },
}));

/**
 *
 * @param {Object} props
 * @param {function} props.onSubmit
 * @returns {React.ReactElement}
 */
function TourForm({ onSubmit }) {
  const { tourId } = useParams();
  const isExisting = !!tourId;

  const containerRef = useRef(null);

  return (
    <ContainerStyled className="tour-form-wrapper">
      <form onSubmit={onSubmit}>
        <div className="tour-form-inner">
          <TourHeaderSection onSave={onSubmit} />
          <TourNavigationTabsSection />
          <Divider />
          <div className="main-content" ref={containerRef}>
            <div className="left-section">
              <Outlet context={{ containerRef }} />
            </div>
            <div className="right-section">
              {isExisting && <TourPoisMapSection containerRef={containerRef} />}
            </div>
          </div>
        </div>
      </form>
    </ContainerStyled>
  );
}

export default TourForm;
