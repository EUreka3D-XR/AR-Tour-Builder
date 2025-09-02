import clsx from "clsx";
import { MenuList, styled } from "@mui/material";

import { useGeneralProvider } from "@/providers/general/GeneralContext";
import useNavPaths from "@/hooks/useNavPaths";
import EurekaIcon from "../icon/EurekaIcon";
import NavbarItem from "./NavbarItem";
import NavbarProjects from "./NavbarProjects";

const MenuListStyled = styled(MenuList)({
  "&.nav-open": {
    padding: "0 1rem",
    width: "240px",
  },
  "&.nav-close": {
    padding: 0,
    width: "80px",
  },
  "& .navbar-item": {
    marginBottom: "0.5rem",
  },
});

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
      <NavbarItem to={navLinks.home.to} name={navLinks.home.label}>
        <EurekaIcon name="home" />
      </NavbarItem>
      <NavbarItem to={navLinks.tours.to} name={navLinks.tours.label}>
        <EurekaIcon name="tour" />
      </NavbarItem>
      <NavbarItem to={navLinks.library.to} name={navLinks.library.label}>
        <EurekaIcon name="media" />
      </NavbarItem>
    </MenuListStyled>
  );
}

export default Navbar;
