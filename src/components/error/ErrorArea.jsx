import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { Stack, styled, Typography } from "@mui/material";

import Button from "@/components/button/Button";
import EurekaIcon from "@/components/icon/EurekaIcon";

const Content = styled("div")({
  textAlign: "center",
  maxWidth: 720,
});

function ErrorArea({
  title,
  subtitle,
  hideReload,
  hideGoBack,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const defaultTitle = title || t("error.default_title");
  const defaultSubtitle = subtitle || t("error.default_message");
  return (
    <Content>
      <Stack spacing={2} alignItems="center">
        <EurekaIcon name="error" size={40} color="error" />
        <Typography variant="h4" gutterBottom>
          {defaultTitle}
        </Typography>
        <Typography color="textSecondary">{defaultSubtitle}</Typography>
        <Stack direction="row" spacing={2}>
          {!hideReload && (
            <Button variant="outlined" onClick={() => window.location.reload()}>
              {t("error.action.refresh")}
            </Button>
          )}
          {!hideGoBack && (
            <Button variant="outlined" onClick={() => navigate(-1)}>
              {t("error.action.go_back")}
            </Button>
          )}
        </Stack>
      </Stack>
    </Content>
  );
}

export default ErrorArea;
