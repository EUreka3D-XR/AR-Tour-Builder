import { useTranslation } from "react-i18next";
import { signupSchema } from "@/validation-schemas/signupSchema";
import { TextField, Typography } from "@mui/material";

import { useSignup } from "@/services/authService";
import Button from "@/components/button/Button";
import FormInput from "@/components/form/FormInput";
import LabeledInput from "@/components/labeled-input/LabeledInput";
import PasswordInput from "@/components/password-input/PasswordInput";
import useNavPaths from "@/hooks/useNavPaths";
import AuthFormBox from "../_common/AuthFormBox";
import HelperBottomText from "../_common/HelperBottomText";

const defaultValues = {
  name: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function SignupPage() {
  const { t } = useTranslation();
  const { navigate, routes } = useNavPaths();
  const { mutate: signup, fetchState } = useSignup();

  const handleSubmit = async (data) => {
    await signup(data);
    navigate(routes.home);
  };

  return (
    <AuthFormBox
      defaultValues={defaultValues}
      validationSchema={signupSchema}
      onSubmit={handleSubmit}
    >
      <Typography variant="h5" component="h1" align="center" fontWeight="bold">
        {t("auth.signup.title")}
      </Typography>
      <FormInput
        name="email"
        render={({ field, formState }) => (
          <LabeledInput label={t("auth.signup.labels.email")}>
            <TextField
              {...field}
              error={!!formState.errors.email}
              helperText={formState.errors.email?.message}
              placeholder={t("auth.signup.placeholders.email")}
              fullWidth
            />
          </LabeledInput>
        )}
      />
      <FormInput
        name="username"
        render={({ field, formState }) => (
          <LabeledInput label={t("auth.signup.labels.username")}>
            <TextField
              {...field}
              error={!!formState.errors.username}
              helperText={formState.errors.username?.message}
              placeholder={t("auth.signup.placeholders.username")}
              fullWidth
            />
          </LabeledInput>
        )}
      />
      <FormInput
        name="name"
        render={({ field, formState }) => (
          <LabeledInput label={t("auth.signup.labels.name")}>
            <TextField
              {...field}
              error={!!formState.errors.name}
              helperText={formState.errors.name?.message}
              placeholder={t("auth.signup.placeholders.name")}
              fullWidth
            />
          </LabeledInput>
        )}
      />
      <FormInput
        name="password"
        render={({ field, formState }) => (
          <LabeledInput label={t("auth.signup.labels.password")}>
            <PasswordInput
              {...field}
              error={!!formState.errors.password}
              helperText={formState.errors.password?.message}
              placeholder={t("auth.signup.placeholders.password")}
              fullWidth
            />
          </LabeledInput>
        )}
      />
      <FormInput
        name="confirmPassword"
        render={({ field, formState }) => (
          <LabeledInput label={t("auth.signup.labels.confirmPassword")}>
            <PasswordInput
              {...field}
              error={!!formState.errors.confirmPassword}
              helperText={formState.errors.confirmPassword?.message}
              placeholder={t("auth.signup.placeholders.confirmPassword")}
              fullWidth
            />
          </LabeledInput>
        )}
      />
      <Button
        variant="filled"
        isFullwidth
        type="submit"
        isLoading={fetchState.isLoading}
      >
        {t("auth.signup.buttons.createAccount")}
      </Button>
      <HelperBottomText
        text={t("auth.signup.helpers.alreadyHaveAccount")}
        linkText={t("auth.signup.links.login")}
        linkUrl="/auth/login"
      />
    </AuthFormBox>
  );
}

export default SignupPage;
