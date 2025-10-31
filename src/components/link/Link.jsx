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
  to,
  rel,
  children,
  openInNewTab = false,
  noWrap,
  className,
  onClick,
}) {
  const href = typeof to === "string" ? to : String(to || "");
  const isExternal = /^(https?:|mailto:|tel:|\/\/)/i.test(href);
  const computedRel = rel ?? (openInNewTab ? "noopener noreferrer" : undefined);

  if (isExternal) {
    return (
      <MuiLinkStyled
        href={href}
        target={openInNewTab ? "_blank" : "_self"}
        rel={computedRel}
        className={className}
        noWrap={noWrap}
        onClick={onClick}
      >
        {children}
      </MuiLinkStyled>
    );
  }

  return (
    <RouterLinkStyled
      to={to}
      target={openInNewTab ? "_blank" : "_self"}
      rel={computedRel}
      className={className}
      onClick={onClick}
    >
      {children}
    </RouterLinkStyled>
  );
}

export default Link;
