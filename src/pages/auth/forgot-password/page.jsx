import { Typography } from "@mui/material";

import AuthFormBox from "../_common/AuthFormBox";

function ForgotPasswordPage() {
  return (
    <AuthFormBox>
      <Typography variant="h5" component="h1" align="center" fontWeight="bold">
        Forgot Password
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        Enter your email address and we&apos;ll send you a link to reset your
        password.
      </Typography>
      {/* Form fields will be added here */}
    </AuthFormBox>
  );
}

export default ForgotPasswordPage;
