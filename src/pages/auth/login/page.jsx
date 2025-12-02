import { Stack, TextField, Typography } from "@mui/material";

import { useLogin } from "@/services/authService";
import Button from "@/components/button/Button";
import FormInput from "@/components/form/FormInput";
import LabeledInput from "@/components/labeled-input/LabeledInput";
import Link from "@/components/link/Link";
import PasswordInput from "@/components/password-input/PasswordInput";
import useNavPaths from "@/hooks/useNavPaths";
import AuthFormBox from "../_common/AuthFormBox";
import HelperBottomText from "../_common/HelperBottomText";

const defaultValues = {
  login: "",
  password: "",
};

function LoginPage() {
  const { navigate, routes } = useNavPaths();
  const { mutate: login, fetchState } = useLogin();

  const handleSubmit = async (data) => {
    await login(data);
    navigate(routes.home);
  };

  return (
    <AuthFormBox defaultValues={defaultValues} onSubmit={handleSubmit}>
      <Typography variant="h5" component="h1" align="center" fontWeight="bold">
        Login
      </Typography>
      <FormInput
        name="login"
        render={({ field }) => (
          <LabeledInput label="Email or username">
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
      <Stack direction="row" justifyContent="flex-end" mb={2}>
        <Link
          to="/auth/forgot-password"
          underline="hover"
          sx={{ fontWeight: 500, color: (theme) => theme.palette.primary.main }}
        >
          Forgot Password?
        </Link>
      </Stack>
      <Button
        variant="filled"
        isFullwidth
        type="submit"
        isLoading={fetchState.isLoading}
      >
        Login
      </Button>
      <HelperBottomText
        text={"Don't have an account?"}
        linkText="Sign Up"
        linkUrl="/auth/signup"
      />
    </AuthFormBox>
  );
}

export default LoginPage;
