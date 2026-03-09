import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";

import { useEGILogin } from "@/services/authService";
import useNavPaths from "@/hooks/useNavPaths";
import { extractEGICallback } from "@/utils/egiAuth";

function EGICallbackPage() {
  const { t } = useTranslation();
  const { navigate, routes } = useNavPaths();
  const { mutate: egiLogin, fetchState } = useEGILogin();
  const hasCalled = useRef(false);

  useEffect(() => {
    if (hasCalled.current) return;
    hasCalled.current = true;

    try {
      const { code, state } = extractEGICallback();
      egiLogin(
        { code, state },
        {
          onSuccess: () => navigate(routes.home, { replace: true }),
          onError: () => navigate("/auth/login?egi_error=1", { replace: true }),
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
      gap={3}
    >
      {fetchState.isError ? (
        <Alert severity="error">
          {t("auth.login.errors.loginFailed", "EGI Login Failed")}
        </Alert>
      ) : (
        <>
          <CircularProgress />
          <Typography variant="h6">
            Completing EGI login, please wait...
          </Typography>
        </>
      )}
    </Box>
  );
}

export default EGICallbackPage;
