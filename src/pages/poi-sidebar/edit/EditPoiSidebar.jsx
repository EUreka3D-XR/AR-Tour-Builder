import { useCallback, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Divider, styled } from "@mui/material";

import useNavPaths from "@/hooks/useNavPaths";
import PoiAssetHeaderSection from "../_common/_sections/PoiAssetHeaderSection";
import PoiFooterSection from "../_common/_sections/PoiFooterSection";
import PoiMainSection from "../_common/_sections/PoiMainSection";
import PoiNavigationTabsSection from "../_common/_sections/PoiNavigationTabsSection";
import PoiSidebarHeader from "../_common/PoiSidebarHeader";
import PoiSidebar from "../_common/sidebar";

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
  const [searchParams] = useSearchParams();

  const { routes } = useNavPaths();

  const isInsideAssetForm = useMemo(
    () => searchParams.get("assetForm"),
    [searchParams],
  );

  const handleClosePoi = useCallback(() => {
    navigate(routes.pois.index);
  }, [navigate, routes]);

  const handleCloseAsset = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <PoiSidebar onClose={handleClosePoi}>
      <ContentStyled className="sidebar-inner">
        <div className="no-shrink">
          <PoiSidebarHeader
            title="Edit Point of Interest"
            onBack={isInsideAssetForm ? handleCloseAsset : undefined}
            onClose={handleClosePoi}
          />
          <Divider />
          {!isInsideAssetForm && <PoiNavigationTabsSection />}
          {isInsideAssetForm && (
            <PoiAssetHeaderSection onBack={handleCloseAsset} />
          )}
          <Divider />
        </div>
        <ScrollableArea className="scrollable-area">
          {!isInsideAssetForm && <PoiMainSection />}
        </ScrollableArea>
        <div className="no-shrink">
          <PoiFooterSection saveIcon="save" />
        </div>
      </ContentStyled>
    </PoiSidebar>
  );
}

export default EditPoiSidebar;
