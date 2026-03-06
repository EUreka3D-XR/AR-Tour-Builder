import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";

import { useEGILogin } from "@/services/authService";
import { extractEGICallback } from "@/utils/egiAuth";

function EGICallbackPage() {
  const navigate = useNavigate();
  const { mutate: egiLogin } = useEGILogin();
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    try {
      const { code } = extractEGICallback();
      egiLogin(code, {
        onSuccess: () => navigate("/projects", { replace: true }),
        onError: () => navigate("/auth/login?egi_error=1", { replace: true }),
      });
    } catch {
      navigate("/auth/login?egi_error=1", { replace: true });
    }
  }, [navigate, egiLogin]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      gap={2}
    >
      <CircularProgress />
      <Typography variant="body2" color="textSecondary">
        Completing sign-in…
      </Typography>
    </Box>
  );
}

export default EGICallbackPage;
