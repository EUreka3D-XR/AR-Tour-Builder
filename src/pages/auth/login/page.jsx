import { Typography } from "@mui/material";

import AuthFormBox from "../_common/AuthFormBox";

function LoginPage() {
  return (
    <AuthFormBox>
      <Typography variant="h5" component="h1" align="center" fontWeight="bold">
        Login
      </Typography>
    </AuthFormBox>
  );
}

export default LoginPage;
