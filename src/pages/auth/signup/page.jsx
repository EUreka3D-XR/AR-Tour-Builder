import { Typography } from "@mui/material";

import AuthFormBox from "../_common/AuthFormBox";

function SignupPage() {
  return (
    <AuthFormBox>
      <Typography variant="h5" component="h1" align="center" fontWeight="bold">
        Sign Up
      </Typography>
      {/* Form fields will be added here */}
    </AuthFormBox>
  );
}

export default SignupPage;
