import clsx from "clsx";
import { styled } from "@mui/material";

const ToggleVisibilityContainer = styled("div")({
  "&.show": { display: "block" },
  "&.hide": { display: "none" },
});

function ToggleVisibility({ show, children }) {
  return (
    <ToggleVisibilityContainer
      className={clsx("toggle-visibility", { show, hide: !show })}
    >
      {children}
    </ToggleVisibilityContainer>
  );
}

export default ToggleVisibility;
