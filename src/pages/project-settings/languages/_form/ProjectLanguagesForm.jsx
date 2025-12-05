import { useParams } from "react-router";
import { FormProvider, useForm } from "react-hook-form";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { useUpdateProject } from "@/services/projectsService";
import FormInput from "@/components/form/FormInput";
import HorizontalFieldWrapper from "@/components/horizontal-field-wrapper/HorizontalFieldWrapper";
import SupportedLanguagesInput from "@/components/languages-input/supported/SupportedLanguagesInput";
import { SettingsFormLayout } from "../../_sections/SettingsFormLayout";
import SettingsSaveRow from "../../_sections/SettingsSaveRow";

function ProjectLanguagesForm({ defaultValues }) {
  const { t } = useTranslation();
  const { projectId } = useParams();
  const { mutate: updateProject } = useUpdateProject(projectId);
  const methods = useForm({
    defaultValues,
  });

  const { handleSubmit, setValue, reset } = methods;

  const handleChange = (val) => {
    setValue("locales", val);
  };

  const onSubmit = async (data) => {
    const newData = await updateProject({ data });
    reset({
      locales: newData.locales,
    });
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SettingsFormLayout>
          <Typography mb={2}>
            <span style={{ fontWeight: "bold" }}>{t("projectSettings.languages.note")}</span>
            {t("projectSettings.languages.noteDescription")}
          </Typography>
          <HorizontalFieldWrapper
            label={t("projectSettings.languages.supportedLanguages.label")}
            description={t("projectSettings.languages.supportedLanguages.description")}
          >
            <FormInput
              name="locales"
              render={({ field, fieldState }) => {
                return (
                  <SupportedLanguagesInput
                    initialValue={defaultValues.locales}
                    value={field.value}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    onChange={handleChange}
                  />
                );
              }}
            />
          </HorizontalFieldWrapper>
          <SettingsSaveRow />
        </SettingsFormLayout>
      </form>
    </FormProvider>
  );
}

export default ProjectLanguagesForm;
