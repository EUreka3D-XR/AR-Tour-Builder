import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import AuthFormBox from "../_common/AuthFormBox";

function ResetPasswordPage() {
  const { t } = useTranslation();

  return (
    <AuthFormBox>
      <Typography variant="h5" component="h1" align="center" fontWeight="bold">
        {t("auth.resetPassword.title")}
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        {t("auth.resetPassword.description")}
      </Typography>
      {/* Form fields will be added here */}
    </AuthFormBox>
  );
}

export default ResetPasswordPage;
