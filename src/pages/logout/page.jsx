import { useEffect } from "react";
import { CircularProgress, Stack, Typography } from "@mui/material";

import { useLogout } from "@/services/authService";
import CenteredArea from "@/components/centered/Centered";
import useNavPaths from "@/hooks/useNavPaths";

function LogoutPage() {
  const { navigate, routes } = useNavPaths();
  const { mutate: logout, fetchState } = useLogout();

  useEffect(() => {
    if (fetchState.isLoading) return;

    logout().then(() => {
      navigate(routes.login);
    });
  }, [logout, navigate, routes, fetchState.isLoading]);

  return (
    <CenteredArea justifyContent="center">
      <Stack spacing={2} alignItems="center">
        <Typography variant="h4" component="h1">
          Logging out...
        </Typography>

        <CircularProgress size="100px" />
      </Stack>
    </CenteredArea>
  );
}

export default LogoutPage;
