import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";
import { Divider, styled } from "@mui/material";

import PoiAssetDetailsSection from "./_sections/PoiAssetDetailsSection";
import PoiAssetHeaderSection from "./_sections/PoiAssetHeaderSection";
import PoiFooterSection from "./_sections/PoiFooterSection";
import PoiMainSection from "./_sections/PoiMainSection";
import PoiNavigationTabsSection from "./_sections/PoiNavigationTabsSection";
import PoiSidebarHeader from "./PoiSidebarHeader";

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

function SidebarInner({ onClose }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const isInsideAssetForm = useMemo(
    () => searchParams.get("mediaForm"),
    [searchParams],
  );

  const handleCloseAsset = useCallback(() => {
    setSearchParams((prev) => {
      prev.delete("mediaForm");
      return prev;
    });
  }, [setSearchParams]);

  return (
    <ContentStyled className="sidebar-inner">
      <div className="no-shrink">
        <PoiSidebarHeader title="Edit Point of Interest" onClose={onClose} />
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
  );
}

export default SidebarInner;
