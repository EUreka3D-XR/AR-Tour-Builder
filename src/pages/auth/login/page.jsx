import { Typography } from "@mui/material";

import AuthFormBox from "@/components/auth/AuthFormBox";

function LoginPage() {
  return (
    <AuthFormBox>
      <Typography variant="h5" component="h1" align="center" fontWeight="bold">
        Login
      </Typography>
      {/* Form fields will be added here */}
    </AuthFormBox>
  );
}

export default LoginPage;
