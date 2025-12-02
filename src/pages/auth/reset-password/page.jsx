import { Typography } from "@mui/material";

import AuthFormBox from "@/components/auth/AuthFormBox";

function ResetPasswordPage() {
  return (
    <AuthFormBox>
      <Typography variant="h5" component="h1" align="center" fontWeight="bold">
        Reset Password
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        Enter your new password below.
      </Typography>
      {/* Form fields will be added here */}
    </AuthFormBox>
  );
}

export default ResetPasswordPage;
