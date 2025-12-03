import { IconButton, styled } from "@mui/material";

import { useLogout } from "@/services/authService";
import { useGeneralProvider } from "@/providers/general/GeneralContext";
import useNavPaths from "@/hooks/useNavPaths";
import logo from "@/assets/images/dummy-logo.webp";
import DropdownMenu from "../dropdown/DropdownMenu";
import EurekaIcon from "../icon/EurekaIcon";

const ContainerStyled = styled("div")(({ theme }) => ({
  width: "100vw",
  height: theme.custom.headerHeight,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 1rem 0 1.5rem",
  "& .logo": {
    height: "100%",
  },
  "& .side-header": {
    height: "100%",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
}));

function Header() {
  const { navigate, routes } = useNavPaths();
  const { isInsideAProject, toggleNavMenu } = useGeneralProvider();

  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout().then(() => {
      navigate(routes.login);
    });
  };

  return (
    <ContainerStyled className="header">
      <div className="side-header left-header">
        {isInsideAProject && (
          <IconButton size="small" onClick={toggleNavMenu}>
            <EurekaIcon name="menu" />
          </IconButton>
        )}
        <img src={logo} alt="logo" className="logo" />
      </div>
      <div className="side-header right-header">
        <DropdownMenu
          id="account-menu"
          items={[
            // { label: "Profile", to: "/profile" },
            // { label: "Settings", to: "/settings" },
            { label: "Logout", onClick: handleLogout },
          ]}
        >
          {({ toggle }) => (
            <IconButton size="small" onClick={toggle}>
              <EurekaIcon name="user" variant="filled" />
            </IconButton>
          )}
        </DropdownMenu>
      </div>
    </ContainerStyled>
  );
}

export default Header;
