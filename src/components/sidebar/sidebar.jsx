import { motion } from "motion/react";
import { Drawer, styled } from "@mui/material";

function Sidebar({ children, onClose }) {
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
      onClose={onClose}
    >
      <ContentStyled className="sidebar-inner">{children}</ContentStyled>
    </DrawerStyled>
  );
}

export default Sidebar;

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
