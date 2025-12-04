import { styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

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

function LibraryHeaderSection() {
  const { t } = useTranslation();

  return (
    <HeaderSection>
      <div className="icon-section">
        <EurekaIcon name="media" className="media-icon" />
      </div>
      <div className="title-section">
        <Typography variant="h3" component="h1" className="title">
          {t("library.header.title")}
        </Typography>
        <Typography variant="body1" className="subtitle">
          {t("library.header.subtitle")}
        </Typography>
      </div>
    </HeaderSection>
  );
}

export default LibraryHeaderSection;
