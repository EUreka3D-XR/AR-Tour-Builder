import { Stack, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const { navigate, routes } = useNavPaths();
  const { mutate: login, fetchState } = useLogin();

  const handleSubmit = async (data) => {
    await login(data);
    navigate(routes.home);
  };

  return (
    <AuthFormBox defaultValues={defaultValues} onSubmit={handleSubmit}>
      <Typography variant="h5" component="h1" align="center" fontWeight="bold">
        {t("auth.login.title")}
      </Typography>
      <FormInput
        name="login"
        render={({ field }) => (
          <LabeledInput label={t("auth.login.labels.emailOrUsername")}>
            <TextField
              {...field}
              placeholder={t("auth.login.placeholders.emailOrUsername")}
              fullWidth
            />
          </LabeledInput>
        )}
      />
      <FormInput
        name="password"
        render={({ field }) => (
          <LabeledInput label={t("auth.login.labels.password")}>
            <PasswordInput {...field} placeholder={t("auth.login.placeholders.password")} fullWidth />
          </LabeledInput>
        )}
      />
      <Stack direction="row" justifyContent="flex-end" mb={2}>
        <Link
          to="/auth/forgot-password"
          underline="hover"
          sx={{ fontWeight: 500, color: (theme) => theme.palette.primary.main }}
        >
          {t("auth.login.links.forgotPassword")}
        </Link>
      </Stack>
      <Button
        variant="filled"
        isFullwidth
        type="submit"
        isLoading={fetchState.isLoading}
      >
        {t("auth.login.buttons.login")}
      </Button>
      <HelperBottomText
        text={t("auth.login.helpers.dontHaveAccount")}
        linkText={t("auth.login.links.signup")}
        linkUrl="/auth/signup"
      />
    </AuthFormBox>
  );
}

export default LoginPage;
