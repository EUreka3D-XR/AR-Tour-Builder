import { useLocation } from "react-router";
import clsx from "clsx";
import { MenuItem, styled } from "@mui/material";

import { useGeneralProvider } from "@/providers/general/GeneralContext";
import Link from "../link/Link";

const MenuItemStyled = styled(MenuItem)({
  borderRadius: "0.5rem",
  "& .nav-item-content": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    "&.nav-item-expand": {
      gap: "1rem",
    },
    "&.nav-item-shrink": {
      flexDirection: "column",
      justifyContent: "center",
      width: "100%",
      "& .nav-item-name": {
        fontSize: "12px",
      },
    },
  },
});

function NavbarItem({ to, children, name, className }) {
  const { isNavMenuOpen } = useGeneralProvider();
  const location = useLocation();

  // Check if current path starts with the 'to' prop value
  const isSelected = location.pathname.startsWith(to);

  return (
    <MenuItemStyled
      selected={isSelected}
      className={clsx("navbar-item", className)}
    >
      <Link
        to={to}
        className={clsx("nav-item-content", {
          "nav-item-expand": isNavMenuOpen,
          "nav-item-shrink": !isNavMenuOpen,
        })}
      >
        {children}
        <span className="nav-item-name">{name}</span>
      </Link>
    </MenuItemStyled>
  );
}

export default NavbarItem;
