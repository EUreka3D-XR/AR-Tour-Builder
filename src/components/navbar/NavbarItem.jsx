import { useLocation } from "react-router";
import clsx from "clsx";
import { MenuItem, styled } from "@mui/material";

import { useGeneralProvider } from "@/providers/general/GeneralContext";
import EurekaIcon from "../icon/EurekaIcon";
import Link from "../link/Link";

const MenuItemStyled = styled(MenuItem)(({ theme }) => ({
  transition: theme.transitions.create(["background-color"], {
    duration: theme.transitions.duration.shortest,
  }),
  "& .nav-item-content": {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  "&.expanded": {
    borderRadius: "0.5rem",
    "& .nav-item-content": {
      gap: "1rem",
    },
    "& .nav-item-shrink": {},
  },
  "&:not(.expanded)": {
    "& .nav-item-content": {
      flexDirection: "column",
      justifyContent: "center",
      width: "100%",
      "& .nav-item-name": {
        fontSize: "12px",
        textWrap: "wrap",
        textAlign: "center",
      },
    },
  },
}));

function NavbarItem({ to, name, className, icon }) {
  const { isNavMenuOpen } = useGeneralProvider();
  const location = useLocation();

  // Check if current path starts with the 'to' prop value
  const isSelected = location.pathname.startsWith(to);

  return (
    <MenuItemStyled
      dense
      selected={isSelected}
      className={clsx("navbar-item", { expanded: isNavMenuOpen }, className)}
    >
      <Link
        to={to}
        className={clsx("nav-item-content", {
          "nav-item-expand": isNavMenuOpen,
          "nav-item-shrink": !isNavMenuOpen,
        })}
      >
        <EurekaIcon name={icon} variant={isSelected ? "filled" : "outlined"} />
        <span className="nav-item-name">{name}</span>
      </Link>
    </MenuItemStyled>
  );
}

export default NavbarItem;
