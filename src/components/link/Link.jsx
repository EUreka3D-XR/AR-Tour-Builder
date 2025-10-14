import { NavLink as RouterLink } from "react-router";
import { Link as MuiLink, styled } from "@mui/material";

const RouterLinkStyled = styled(RouterLink)({
  color: "inherit",
  fontSize: "inherit",
  textDecoration: "none",
});

const MuiLinkStyled = styled(MuiLink)({
  color: "inherit",
  fontSize: "inherit",
  textDecoration: "none",
});

function Link({
  isExterior,
  to,
  rel,
  children,
  openInNewTab = false,
  noWrap,
  className,
}) {
  if (isExterior) {
    return (
      <MuiLinkStyled
        href={to}
        target={openInNewTab ? "_blank" : "_self"}
        rel={rel}
        className={className}
        noWrap={noWrap}
      >
        {children}
      </MuiLinkStyled>
    );
  }

  return (
    <RouterLinkStyled
      to={to}
      target={openInNewTab ? "_blank" : "_self"}
      rel={rel}
      className={className}
    >
      {children}
    </RouterLinkStyled>
  );
}

export default Link;
