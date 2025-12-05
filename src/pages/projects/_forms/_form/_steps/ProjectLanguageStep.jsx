import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import FormInput from "@/components/form/FormInput";
import HorizontalFieldWrapper from "@/components/horizontal-field-wrapper/HorizontalFieldWrapper";
import SupportedLanguagesInput from "@/components/languages-input/supported/SupportedLanguagesInput";
import { ProjectFormSection } from "../_layout/ProjectFormLayout";

function ProjectLanguageStep() {
  const { t } = useTranslation();
  const { setValue } = useFormContext();

  const handleChange = (val) => {
    setValue("locales", val);
  };
  return (
    <ProjectFormSection>
      <HorizontalFieldWrapper
        label={t("projects.form.languages.label")}
        description={t("projects.form.languages.description")}
      >
        <FormInput
          name="locales"
          render={({ field, fieldState }) => {
            return (
              <SupportedLanguagesInput
                value={field.value}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                onChange={handleChange}
              />
            );
          }}
        />
      </HorizontalFieldWrapper>
    </ProjectFormSection>
  );
}

export default ProjectLanguageStep;
