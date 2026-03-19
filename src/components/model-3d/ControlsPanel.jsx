import { styled } from "@mui/material";

const PanelStyled = styled("div")({
  position: "absolute",
  top: 16,
  right: 16,
  overflow: "hidden",
});

function ControlsPanel({ children }) {
  return <PanelStyled>{children}</PanelStyled>;
}

export default ControlsPanel;
