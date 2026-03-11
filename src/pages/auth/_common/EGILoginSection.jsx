import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { styled } from "@mui/material";

import Button from "@/components/button/Button";
import { startEGILogin } from "@/utils/egiAuth";
import egiLogoWhite from "@/assets/images/egi_logo_white.svg";
import egiLogo from "@/assets/images/egi_logo.svg";

const EGI_BLUE = "#005faa";

const EGIButton = styled(Button)(({ theme }) => ({
  gap: theme.spacing(1.5),
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  backgroundColor: EGI_BLUE,
  border: `2px solid ${EGI_BLUE}`,
  "&:hover": {
    backgroundColor: "#ffffff",
    borderColor: EGI_BLUE,
    color: EGI_BLUE,
    "& .egi-logo.egi-logo-white": {
      display: "none",
    },
    "& .egi-logo.egi-logo-color": {
      display: "block",
    },
  },
  "& .egi-logo": {
    height: 24,
    "&.egi-logo-white": {
      display: "block",
    },
    "&.egi-logo-color": {
      display: "none",
    },
  },
}));

function EGILoginSection() {
  const { t } = useTranslation();
  return (
    <EGIButton
      variant="filled"
      corners="round"
      onClick={startEGILogin}
      startIcon={
        <span>
          <img
            className={clsx("egi-logo", "egi-logo-white")}
            src={egiLogoWhite}
            alt={t("auth.logoAlt")}
          />
          <img
            className={clsx("egi-logo", "egi-logo-color")}
            src={egiLogo}
            alt={t("auth.logoAlt")}
          />
        </span>
      }
    >
      {t("auth.egiLogin")}
    </EGIButton>
  );
}

export default EGILoginSection;
