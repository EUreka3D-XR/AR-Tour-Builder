import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { TextField } from "@mui/material";

import { useUpdateMe } from "@/services/usersService";
import HorizontalFieldWrapper from "@/components/horizontal-field-wrapper/HorizontalFieldWrapper";
import { SettingsFormLayout } from "../../_sections/SettingsFormLayout";
import SettingsSaveRow from "../../_sections/SettingsSaveRow";

function UserSettingsForm({ defaultValues }) {
  const { t } = useTranslation();
  const { mutate: updateMe } = useUpdateMe();
  const methods = useForm({ defaultValues });

  const { handleSubmit, reset, setError, formState: { errors } } = methods;

  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      username: data.username,
    };
    try {
      const newData = await updateMe(payload);
      reset({
        name: newData.name,
        username: newData.username,
        email: newData.email,
      });
    } catch (error) {
      if (error?.response?.data?.username) {
        setError("username", {
          type: "server",
          message: t("projectSettings.userSettings.username.alreadyTaken"),
        });
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SettingsFormLayout>
          <HorizontalFieldWrapper
            label={t("projectSettings.userSettings.name.label")}
            description={t("projectSettings.userSettings.name.description")}
          >
            <TextField
              fullWidth
              placeholder={t("projectSettings.userSettings.name.placeholder")}
              {...methods.register("name")}
            />
          </HorizontalFieldWrapper>
          <HorizontalFieldWrapper
            label={t("projectSettings.userSettings.username.label")}
            description={t("projectSettings.userSettings.username.description")}
          >
            <TextField
              fullWidth
              placeholder={t(
                "projectSettings.userSettings.username.placeholder",
              )}
              error={!!errors.username}
              helperText={errors.username?.message}
              {...methods.register("username")}
            />
          </HorizontalFieldWrapper>
          <HorizontalFieldWrapper
            label={t("projectSettings.userSettings.email.label")}
            description={t("projectSettings.userSettings.email.description")}
          >
            <TextField fullWidth {...methods.register("email")} disabled />
          </HorizontalFieldWrapper>
          <SettingsSaveRow />
        </SettingsFormLayout>
      </form>
    </FormProvider>
  );
}

export default UserSettingsForm;
