import { styled } from "@mui/material";

const SidebarFormArea = styled("div")(() => ({
  flex: 1,
  overflow: "hidden",
  "& > div": {
    height: "100%",
  },
  "& .main-area": {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
}));

export default SidebarFormArea;
