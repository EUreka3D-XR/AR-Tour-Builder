import { useTranslation } from "react-i18next";
import { Button, styled, Typography } from "@mui/material";

import { useProfile } from "@/services/profileService";
import useNavPaths from "@/hooks/useNavPaths";
import EurekaIcon from "@/components/icon/EurekaIcon";
import UserSettingsForm from "@/pages/project-settings/user-settings/_form/UserSettingsForm";

const PageContainerStyled = styled("div")(({ theme }) => ({
  maxWidth: 800,
  margin: "0 auto",
  padding: theme.spacing(4),
}));

const HeaderStyled = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(4),
  "& .icon-section": {
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.spacing(2),
    width: 80,
    height: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    "& .media-icon": {
      color: "white",
      fontSize: 40,
    },
  },
  "& .title-section": {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    "& .title": {
      fontWeight: 700,
      color: theme.palette.text.primary,
    },
    "& .subtitle": {
      fontSize: "1.125rem",
      color: theme.palette.text.secondary,
    },
  },
}));

function AccountSettingsPage() {
  const { t } = useTranslation();
  const { navigate, routes } = useNavPaths();
  const { data: profile, fetchState } = useProfile();

  if (fetchState.isError) {
    return <div>Error loading user data.</div>;
  }
  if (fetchState.isLoading || !profile) {
    return <div>Loading...</div>;
  }

  const defaultValues = {
    name: profile.name || "",
    username: profile.username || "",
    email: profile.email || "",
  };

  return (
    <PageContainerStyled>
      <Button
        startIcon={<EurekaIcon name="back" />}
        onClick={() => navigate(routes.projects.index)}
        sx={{ mb: 3 }}
      >
        {t("accountSettings.backToProjects")}
      </Button>
      <HeaderStyled>
        <div className="icon-section">
          <EurekaIcon name="user" className="media-icon" />
        </div>
        <div className="title-section">
          <Typography variant="h3" component="h1" className="title">
            {t("accountSettings.header.title")}
          </Typography>
          <Typography variant="body1" className="subtitle">
            {t("accountSettings.header.subtitle")}
          </Typography>
        </div>
      </HeaderStyled>
      <UserSettingsForm defaultValues={defaultValues} />
    </PageContainerStyled>
  );
}

export default AccountSettingsPage;
