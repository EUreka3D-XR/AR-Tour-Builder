import { useNavigate } from "react-router";
import { Stack, styled, Typography } from "@mui/material";

import Button from "@/components/button/Button";
import EurekaIcon from "@/components/icon/EurekaIcon";

const Content = styled("div")({
  textAlign: "center",
  maxWidth: 720,
});

function ErrorArea({
  title = "Something went wrong",
  subtitle = "Our system encountered a temporary issue. Try refreshing the page or come back in a few moments. If the problem persists, contact support.",
  hideReload,
  hideGoBack,
}) {
  const navigate = useNavigate();
  return (
    <Content>
      <Stack spacing={2} alignItems="center">
        <EurekaIcon name="error" size={40} color="error" />
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Typography color="textSecondary">{subtitle}</Typography>
        <Stack direction="row" spacing={2}>
          {!hideReload && (
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Refresh
            </Button>
          )}
          {!hideGoBack && (
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Go back
            </Button>
          )}
        </Stack>
      </Stack>
    </Content>
  );
}

export default ErrorArea;
