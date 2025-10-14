import clsx from "clsx";
import { MenuList, styled } from "@mui/material";

import { useGeneralProvider } from "@/providers/general/GeneralContext";
import useNavPaths from "@/hooks/useNavPaths";
import NavbarItem from "./NavbarItem";
import NavbarProjects from "./NavbarProjects";

const MenuListStyled = styled(MenuList)(({ theme }) => ({
  boxShadow: "2px 0 8px rgba(0,0,0,0.08)", // right shadow
  transition: theme.transitions.create("width"),
  "&.nav-open": {
    padding: "0 1rem",
    width: "300px",
  },
  "&.nav-close": {
    padding: 0,
    width: "80px",
  },
  "& .navbar-item": {
    marginBottom: "0.5rem",
  },
}));

function Navbar() {
  const { isNavMenuOpen } = useGeneralProvider();
  const { navLinks } = useNavPaths();

  return (
    <MenuListStyled
      className={clsx({
        "nav-open": isNavMenuOpen,
        "nav-close": !isNavMenuOpen,
      })}
    >
      <NavbarProjects />
      <NavbarItem
        to={navLinks.dashboard.to}
        name={navLinks.dashboard.label}
        icon="home"
      />
      <NavbarItem
        to={navLinks.tours.to}
        name={navLinks.tours.label}
        icon="tour"
      />
      <NavbarItem
        to={navLinks.library.to}
        name={navLinks.library.label}
        icon="media"
      />
    </MenuListStyled>
  );
}

export default Navbar;
