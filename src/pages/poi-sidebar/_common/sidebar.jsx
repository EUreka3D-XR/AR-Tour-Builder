import { useCallback } from "react";
import { useSearchParams } from "react-router";
import { motion } from "motion/react";
import { Divider, Drawer, styled } from "@mui/material";

import useNavPaths from "@/hooks/useNavPaths";
import PoiAssetHeaderSection from "./_sections/PoiAssetHeaderSection";
import PoiFooterSection from "./_sections/PoiFooterSection";
import PoiNavigationTabsSection from "./_sections/PoiNavigationTabsSection";
import PoiSidebarHeader from "./_sections/PoiSidebarHeader";

function PoiSidebar({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { routes, navigate } = useNavPaths();

  const isInsideAssetForm = Boolean(searchParams.get("mediaForm"));

  const handleCloseSidebar = useCallback(() => {
    navigate(routes.pois.index);
  }, [navigate, routes]);

  const handleCloseAsset = useCallback(() => {
    setSearchParams((prev) => {
      prev.delete("mediaForm");
      return prev;
    });
  }, [setSearchParams]);

  return (
    <DrawerStyled
      anchor="right"
      open
      slotProps={{
        paper: {
          className: "drawer-paper",
          component: motion.div,
          initial: { x: "100%" },
          animate: { x: 0 },
          exit: { x: "100%" },
          transition: { type: "tween", duration: 0.3 },
        },
      }}
      onClose={handleCloseSidebar}
    >
      <ContentStyled className="sidebar-inner">
        <div className="no-shrink">
          <PoiSidebarHeader
            title="Edit Point of Interest"
            onClose={handleCloseSidebar}
          />
          <Divider />
          {!isInsideAssetForm && <PoiNavigationTabsSection tabs={poiTabs} />}
          {isInsideAssetForm && (
            <PoiAssetHeaderSection
              title="Create Asset"
              onBack={handleCloseAsset}
            />
          )}
          <Divider />
        </div>
        <ScrollableArea className="scrollable-area">
          {typeof children === "function" &&
            children({ showAssetForm: isInsideAssetForm })}
        </ScrollableArea>
        <div className="no-shrink">
          <PoiFooterSection steps={steps} onCancel={handleCloseSidebar} />
        </div>
      </ContentStyled>
    </DrawerStyled>
  );
}

export default PoiSidebar;

const DrawerStyled = styled(Drawer)(() => ({
  "& .drawer-paper": {
    width: "800px",
    height: "100vh",
  },
  "& form": {
    height: "100%",
  },
}));

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

const poiTabs = [
  { icon: "poi", value: "location", label: "Location" },
  { icon: "info", value: "details", label: "Details" },
  { icon: "link", value: "external-links", label: "External Links" },
  { icon: "media", value: "media", label: "Media" },
];

const steps = poiTabs.map((tab) => tab.value);
