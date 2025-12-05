import { Stack, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

import FormInputMultilingual from "@/components/form/FormInputMultilingual";
import HorizontalFieldWrapper from "@/components/horizontal-field-wrapper/HorizontalFieldWrapper";
import LanguageDropdown from "@/components/language-dropdown/LanguageDropdown";
import { ProjectFormSection } from "../_layout/ProjectFormLayout";

function ProjectBasicStep() {
  const { t } = useTranslation();
  return (
    <ProjectFormSection>
      <Stack direction="row" justifyContent="flex-end">
        <LanguageDropdown />
      </Stack>
      <HorizontalFieldWrapper
        label={t("projects.form.basic.title.label")}
        description={t("projects.form.basic.title.description")}
        isMultilingual
      >
        <FormInputMultilingual
          name="title"
          render={({ field, formState }) => {
            return (
              <TextField
                fullWidth
                placeholder={t("projects.form.basic.title.placeholder")}
                error={!!formState.errors.title}
                helperText={formState.errors.title?.message}
                {...field}
              />
            );
          }}
        />
      </HorizontalFieldWrapper>
      <HorizontalFieldWrapper
        label={t("projects.form.basic.description.label")}
        description={t("projects.form.basic.description.description")}
        isMultilingual
      >
        <FormInputMultilingual
          name="description"
          render={({ field, formState }) => {
            return (
              <TextField
                fullWidth
                placeholder={t("projects.form.basic.description.placeholder")}
                multiline
                rows={4}
                error={!!formState.errors.description}
                helperText={formState.errors.description?.message}
                {...field}
              />
            );
          }}
        />
      </HorizontalFieldWrapper>
    </ProjectFormSection>
  );
}

export default ProjectBasicStep;
