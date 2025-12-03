import { styled, Typography } from "@mui/material";

import EurekaIcon from "@/components/icon/EurekaIcon";

const HeaderSection = styled("div")(({ theme }) => ({
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

function SettingsHeader() {
  return (
    <HeaderSection>
      <div className="icon-section">
        <EurekaIcon name="settings" className="media-icon" />
      </div>
      <div className="title-section">
        <Typography variant="h3" component="h1" className="title">
          Settings
        </Typography>
        <Typography variant="body1" className="subtitle">
          Manage your project settings and configurations
        </Typography>
      </div>
    </HeaderSection>
  );
}

export default SettingsHeader;
