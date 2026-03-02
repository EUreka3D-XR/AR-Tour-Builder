import { Outlet } from "react-router";
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import dummyLogo from "@/assets/images/eureka3d-xr-logo.webp";

const Root = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(3),
}));

const Content = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 32,
});

const Logo = styled(Box)({
  height: 80,
  width: "auto",
  objectFit: "contain",
});

function AuthPage() {
  const { t } = useTranslation();

  return (
    <Root>
      <Content>
        <Logo component="img" src={dummyLogo} alt={t("auth.logoAlt")} />
        <Typography
          variant="h3"
          component="h1"
          align="center"
          fontWeight="bold"
        >
          {t("auth.welcomeBack")}
        </Typography>
        <Outlet />
      </Content>
    </Root>
  );
}

export default AuthPage;
