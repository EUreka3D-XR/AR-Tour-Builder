import { useCallback } from "react";
import { useNavigate } from "react-router";
import { styled } from "@mui/material";

import useNavPaths from "@/hooks/useNavPaths";
import PoiSidebarHeader from "../_common/PoiSidebarHeader";
import PoiSidebar from "../_common/sidebar";
import PoiFooterSection from "./_sections/PoiFooterSection";
import PoiMainSection from "./_sections/PoiMainSection";
import PoiNavigationTabsSection from "./_sections/PoiNavigationTabsSection";

const ContentStyled = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  "& .no-shrink": {
    flexShrink: 0,
  },
});

const ScrollableArea = styled("div")({
  flex: 1,
  overflowY: "auto",
});

function EditPoiSidebar() {
  const navigate = useNavigate();
  const { routes } = useNavPaths();

  const handleClose = useCallback(() => {
    navigate(routes.pois.index);
  }, [navigate, routes]);

  return (
    <PoiSidebar onClose={handleClose}>
      <ContentStyled className="sidebar-inner">
        <div className="no-shrink">
          <PoiSidebarHeader
            title="Edit Point of Interest"
            onBack={() => {}}
            onClose={handleClose}
          />
          <PoiNavigationTabsSection />
        </div>
        <ScrollableArea className="scrollable-area">
          <PoiMainSection />
        </ScrollableArea>
        <div className="no-shrink">
          <PoiFooterSection saveIcon="save" />
        </div>
      </ContentStyled>
    </PoiSidebar>
  );
}

export default EditPoiSidebar;
