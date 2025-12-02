import { TextField, Typography } from "@mui/material";

import Button from "@/components/button/Button";
import FormInput from "@/components/form/FormInput";
import LabeledInput from "@/components/labeled-input/LabeledInput";
import PasswordInput from "@/components/password-input/PasswordInput";
import AuthFormBox from "../_common/AuthFormBox";
import HelperBottomText from "../_common/HelperBottomText";

const defaultValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

function SignupPage() {
  const handleSubmit = async () => {};
  return (
    <AuthFormBox defaultValues={defaultValues} onSubmit={handleSubmit}>
      <Typography variant="h5" component="h1" align="center" fontWeight="bold">
        Sign Up
      </Typography>
      <FormInput
        name="email"
        render={({ field }) => (
          <LabeledInput label="Email">
            <TextField
              {...field}
              placeholder="ex. user@example.com"
              fullWidth
            />
          </LabeledInput>
        )}
      />
      <FormInput
        name="password"
        render={({ field }) => (
          <LabeledInput label="Password">
            <PasswordInput {...field} placeholder="*******" fullWidth />
          </LabeledInput>
        )}
      />
      <FormInput
        name="confirmPassword"
        render={({ field }) => (
          <LabeledInput label="Confirm Password">
            <PasswordInput {...field} placeholder="*******" fullWidth />
          </LabeledInput>
        )}
      />
      <Button variant="filled" isFullwidth type="submit">
        Create Account
      </Button>
      <HelperBottomText
        text={"Already have an account?"}
        linkText="Login"
        linkUrl="/auth/login"
      />
    </AuthFormBox>
  );
}

export default SignupPage;
