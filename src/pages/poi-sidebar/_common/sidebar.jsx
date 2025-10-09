import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Drawer, styled } from "@mui/material";

const DrawerStyled = styled(Drawer)(({ theme }) => ({
  "& .drawer-paper": {
    width: "1000px",
  },
}));

function BasePoiSidebar() {
  const navigate = useNavigate();

  return (
    // <AnimatePresence>
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
      onClose={() => {
        navigate(-1);
      }}
    >
      <div>BasePoiSidebar</div>
    </DrawerStyled>
    // </AnimatePresence>
  );
}

export default BasePoiSidebar;
