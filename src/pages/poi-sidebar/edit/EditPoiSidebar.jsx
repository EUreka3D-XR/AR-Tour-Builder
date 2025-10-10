import { useCallback, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Divider, styled } from "@mui/material";

import useNavPaths from "@/hooks/useNavPaths";
import PoiAssetDetailsSection from "../_common/_sections/PoiAssetDetailsSection";
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
  const [searchParams, setSearchParams] = useSearchParams();

  const { routes } = useNavPaths();

  const isInsideAssetForm = useMemo(
    () => searchParams.get("mediaForm"),
    [searchParams],
  );

  const handleClosePoi = useCallback(() => {
    navigate(routes.pois.index);
  }, [navigate, routes]);

  const handleCloseAsset = useCallback(() => {
    setSearchParams((prev) => {
      prev.delete("mediaForm");
      return prev;
    });
  }, [setSearchParams]);

  return (
    <PoiSidebar onClose={handleClosePoi}>
      <ContentStyled className="sidebar-inner">
        <div className="no-shrink">
          <PoiSidebarHeader
            title="Edit Point of Interest"
            onClose={handleClosePoi}
          />
          <Divider />
          {!isInsideAssetForm && <PoiNavigationTabsSection />}
          {isInsideAssetForm && (
            <PoiAssetHeaderSection
              title="Create Asset"
              onBack={handleCloseAsset}
            />
          )}
          <Divider />
        </div>
        <ScrollableArea className="scrollable-area">
          {!isInsideAssetForm && <PoiMainSection />}
          {isInsideAssetForm && <PoiAssetDetailsSection />}
        </ScrollableArea>
        <div className="no-shrink">
          <PoiFooterSection saveIcon="save" />
        </div>
      </ContentStyled>
    </PoiSidebar>
  );
}

export default EditPoiSidebar;
