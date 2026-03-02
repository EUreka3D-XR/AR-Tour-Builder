import { useTranslation } from "react-i18next";
import { Stack, Typography } from "@mui/material";

import Button from "@/components/button/Button";
import egiLogoWhite from "@/assets/images/egi_logo_white.svg";

function EGILoginSection() {
  const { t } = useTranslation();
  return (
    <Stack alignItems="stretch" spacing={2}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={1}
      >
        <span style={{ flex: 1, height: 1, backgroundColor: "#ccc" }} />
        <Typography variant="body2" color="textSecondary" mr={1}>
          {t("auth.or")}
        </Typography>
        <span style={{ flex: 1, height: 1, backgroundColor: "#ccc" }} />
      </Stack>
      <Button
        variant="filled"
        startIcon={
          <img
            src={egiLogoWhite}
            alt={t("auth.logoAlt")}
            style={{ height: 24 }}
          />
        }
      >
        {t("auth.egiLogin")}
      </Button>
    </Stack>
  );
}

export default EGILoginSection;
