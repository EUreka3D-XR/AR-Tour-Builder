import { useFormContext } from "react-hook-form";

import FormInput from "@/components/form/FormInput";
import HorizontalFieldWrapper from "@/components/horizontal-field-wrapper/HorizontalFieldWrapper";
import ProjectSupportedLanguagesInput from "@/components/languages-input/supported/ProjectSupportedLanguagesInput";
import { ProjectFormSection } from "../_layout/ProjectFormLayout";

function ProjectLanguageSection() {
  const { setValue } = useFormContext();
  return (
    <ProjectFormSection>
      <HorizontalFieldWrapper
        label="Supported Languages"
        description="Specify the languages your project supports. You can populate content in multiple languages later in the project's settings."
      >
        <FormInput
          name="locales"
          render={({ field }) => (
            <ProjectSupportedLanguagesInput
              value={field.value}
              onChange={(val) => setValue("locales", val)}
            />
          )}
        />
      </HorizontalFieldWrapper>
    </ProjectFormSection>
  );
}

export default ProjectLanguageSection;
