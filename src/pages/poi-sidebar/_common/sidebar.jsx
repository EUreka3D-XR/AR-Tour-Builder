import { motion } from "motion/react";
import { Drawer, styled } from "@mui/material";

const DrawerStyled = styled(Drawer)(({ theme }) => ({
  "& .drawer-paper": {
    width: "800px",
    height: "100vh",
  },
  "& .drawer-content": {},
}));

function PoiSidebar({ children, onClose }) {
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
      {children}
    </DrawerStyled>
  );
}

export default PoiSidebar;
