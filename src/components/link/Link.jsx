import { NavLink as RouterLink } from "react-router";
import clsx from "clsx";
import { Link as MuiLink, styled } from "@mui/material";

const RouterLinkStyled = styled(RouterLink)({
  color: "inherit",
  fontSize: "inherit",
  textDecoration: "none",
  "&.underline-hover": {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  "&.underline-always": {
    textDecoration: "underline",
  },
});

const MuiLinkStyled = styled(MuiLink)({
  color: "inherit",
  fontSize: "inherit",
});

/**
 *
 * @param {Object} props
 * @param {string|object} props.to
 * @param {React.ReactNode} props.children
 * @param {string} [props.rel]
 * @param {boolean} [props.openInNewTab]
 * @param {'none' | 'hover' | 'always'} [props.underline]
 * @param {boolean} [props.noWrap]
 * @param {string} [props.className]
 * @param {function} [props.onClick]
 * @returns
 */
function LinkUnstyled({
  to,
  rel,
  children,
  openInNewTab = false,
  underline = "none",
  noWrap,
  className,
  onClick,
}) {
  const href = typeof to === "string" ? to : String(to || "");
  const isFake = href === "#";
  const isExternal = /^(https?:|mailto:|tel:|\/\/)/i.test(href);
  const computedRel = rel ?? (openInNewTab ? "noopener noreferrer" : undefined);

  if (isFake) {
    return (
      <MuiLinkStyled
        href={href}
        noWrap={noWrap}
        underline={underline}
        className={className}
        onClick={onClick}
      >
        {children}
      </MuiLinkStyled>
    );
  }
  if (isExternal) {
    return (
      <MuiLinkStyled
        href={href}
        target={openInNewTab ? "_blank" : "_self"}
        rel={computedRel}
        noWrap={noWrap}
        underline={underline}
        className={className}
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
      className={clsx(
        {
          "underline-always": underline === "always",
          "underline-hover": underline === "hover",
        },
        className,
      )}
      onClick={onClick}
    >
      {children}
    </RouterLinkStyled>
  );
}

const Link = styled(LinkUnstyled)({});

export default Link;
