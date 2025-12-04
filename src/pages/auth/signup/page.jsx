import { TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const handleSubmit = async () => {};

  return (
    <AuthFormBox defaultValues={defaultValues} onSubmit={handleSubmit}>
      <Typography variant="h5" component="h1" align="center" fontWeight="bold">
        {t("auth.signup.title")}
      </Typography>
      <FormInput
        name="email"
        render={({ field }) => (
          <LabeledInput label={t("auth.signup.labels.email")}>
            <TextField
              {...field}
              placeholder={t("auth.signup.placeholders.email")}
              fullWidth
            />
          </LabeledInput>
        )}
      />
      <FormInput
        name="password"
        render={({ field }) => (
          <LabeledInput label={t("auth.signup.labels.password")}>
            <PasswordInput {...field} placeholder={t("auth.signup.placeholders.password")} fullWidth />
          </LabeledInput>
        )}
      />
      <FormInput
        name="confirmPassword"
        render={({ field }) => (
          <LabeledInput label={t("auth.signup.labels.confirmPassword")}>
            <PasswordInput {...field} placeholder={t("auth.signup.placeholders.confirmPassword")} fullWidth />
          </LabeledInput>
        )}
      />
      <Button variant="filled" isFullwidth type="submit">
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
