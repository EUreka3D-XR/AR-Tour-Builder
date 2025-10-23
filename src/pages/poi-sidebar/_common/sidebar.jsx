import { useCallback } from "react";
import { useSearchParams } from "react-router";
import { motion } from "motion/react";
import { Divider, Drawer, styled } from "@mui/material";

import useNavPaths from "@/hooks/useNavPaths";
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
      prev.delete("mediaId");
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
        </div>
        {typeof children === "function" &&
          children({
            showAssetForm: isInsideAssetForm,
            onCloseAsset: handleCloseAsset,
            onClosePoi: handleCloseSidebar,
          })}
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
