import { Outlet } from "react-router";
import { useTranslation } from "react-i18next";
import { Box, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

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

const Content = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(4),
}));

const Logo = styled(Box)({
  height: 180,
  width: "auto",
  objectFit: "contain",
});

function AuthPage() {
  const { t } = useTranslation();

  return (
    <Root>
      <Content>
        <Stack alignItems="center" spacing={1}>
          <Logo component="img" src={"/logo.webp"} alt={t("auth.logoAlt")} />
          <Typography
            variant="h3"
            component="h1"
            align="center"
            fontWeight="bold"
          >
            {t("auth.welcomeBack")}
          </Typography>
        </Stack>
        <Outlet />
      </Content>
    </Root>
  );
}

export default AuthPage;
