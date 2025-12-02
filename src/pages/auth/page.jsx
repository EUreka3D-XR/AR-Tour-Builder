import { Outlet } from "react-router";
import { Box } from "@mui/material";

import dummyLogo from "@/assets/images/dummy-logo.webp";

function AuthPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.default",
        padding: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Box
          component="img"
          src={dummyLogo}
          alt="Logo"
          sx={{
            height: 80,
            width: "auto",
            objectFit: "contain",
          }}
        />
        <Outlet />
      </Box>
    </Box>
  );
}

export default AuthPage;
