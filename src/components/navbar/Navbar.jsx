import clsx from "clsx";
import {
  HomeOutlined,
  PermMediaOutlined,
  TourOutlined,
} from "@mui/icons-material";
import { MenuList, styled } from "@mui/material";

import { useGeneralProvider } from "@/providers/general/GeneralContext";
import { navPaths } from "@/utils/paths";
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

  return (
    <MenuListStyled
      className={clsx({
        "nav-open": isNavMenuOpen,
        "nav-close": !isNavMenuOpen,
      })}
    >
      <NavbarProjects />
      <NavbarItem to={navPaths.home.to} name={navPaths.home.label}>
        <HomeOutlined />
      </NavbarItem>
      <NavbarItem to={navPaths.tours.to} name={navPaths.tours.label}>
        <TourOutlined />
      </NavbarItem>
      <NavbarItem to={navPaths.library.to} name={navPaths.library.label}>
        <PermMediaOutlined />
      </NavbarItem>
    </MenuListStyled>
  );
}

export default Navbar;
