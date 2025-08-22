import { IconButton, styled } from "@mui/material";

import { useGeneralProvider } from "@/providers/general/GeneralContext";
import logo from "@/assets/images/dummy-logo.webp";
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
  const { isInsideAProject, toggleNavMenu } = useGeneralProvider();

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
        <IconButton size="small">
          <EurekaIcon name="user" variant="filled" />
        </IconButton>
      </div>
    </ContainerStyled>
  );
}

export default Header;
