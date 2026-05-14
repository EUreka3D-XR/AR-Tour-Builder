import { useEffect, useRef, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import {
  Alert,
  Box,
  CircularProgress,
  Stack,
  styled,
  Typography,
} from "@mui/material";

import { useEGILogin } from "@/services/authService";
import Button from "@/components/button/Button";
import useNavPaths from "@/hooks/useNavPaths";
import { extractEGICallback } from "@/utils/egiAuth";

const Logo = styled(Box)({
  height: 180,
  width: "auto",
  objectFit: "contain",
});

function EGICallbackPage() {
  const { t } = useTranslation();
  const { navigate, routes } = useNavPaths();
  const { mutate: egiLogin } = useEGILogin();
  const hasCalled = useRef(false);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    if (hasCalled.current) return;
    hasCalled.current = true;

    try {
      const { code, state, codeVerifier } = extractEGICallback();
      egiLogin(
        { code, state, codeVerifier },
        {
          onSuccess: () => navigate(routes.home, { replace: true }),
          onError: (error) => {
            if (error?.response?.status === 401) {
              setAccessDenied(true);
            } else {
              navigate("/auth/login?egi_error=1", { replace: true });
            }
          },
        },
      );
    } catch {
      navigate("/auth/login?egi_error=1", { replace: true });
    }
  }, [navigate, egiLogin, routes?.home]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      width="100vw"
      gap={3}
    >
      <Stack alignItems="center" spacing={1}>
        <Logo component="img" src={"/logo.webp"} alt={t("auth.logoAlt")} />
        {accessDenied ? (
          <Box
            maxWidth={480}
            width="100%"
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <Alert severity="error">
              {t(
                "auth.login.egiAccess.noAccess",
                "An error has occurred, you don't have access to the AR Tour Builder Space",
              )}
            </Alert>
            <Alert severity="info">
              <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                <Trans i18nKey="auth.login.egiAccess.requestAccess" />
              </Typography>
            </Alert>
            <Button
              variant="filled"
              corners="round"
              href="https://go.egi.eu/join_eureka3d"
              target="_blank"
              rel="noopener"
            >
              {t("auth.login.egiAccess.requestAccessLink", "Request access")}
            </Button>
          </Box>
        ) : (
          <>
            <CircularProgress />
            <Typography variant="h6">
              {t(
                "auth.login.egiAccess.completing",
                "Completing EGI login, please wait...",
              )}
            </Typography>
          </>
        )}
      </Stack>
    </Box>
  );
}

export default EGICallbackPage;
