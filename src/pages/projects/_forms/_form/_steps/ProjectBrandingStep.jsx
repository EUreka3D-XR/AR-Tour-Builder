import { useTranslation } from "react-i18next";

import FormImageInput from "@/components/form/FormImageInput";
import HorizontalFieldWrapper from "@/components/horizontal-field-wrapper/HorizontalFieldWrapper";
import { ProjectFormSection } from "../_layout/ProjectFormLayout";

function ProjectBrandingStep() {
  const { t } = useTranslation();

  return (
    <ProjectFormSection>
      <HorizontalFieldWrapper
        label={t("projects.form.branding.logo.label")}
        description={t("projects.form.branding.logo.description")}
      >
        <FormImageInput
          idName="logo"
          urlName="logoUrl"
          placeholderText={t("projects.form.branding.logo.placeholder")}
          maxFileSize={2}
          className="logo-dropzone"
        />
      </HorizontalFieldWrapper>
      <HorizontalFieldWrapper
        label={t("projects.form.branding.coverPhoto.label")}
        description={t("projects.form.branding.coverPhoto.description")}
      >
        <FormImageInput
          idName="coverPhoto"
          urlName="coverPhotoUrl"
          placeholderText={t("projects.form.branding.coverPhoto.placeholder")}
        />
      </HorizontalFieldWrapper>
    </ProjectFormSection>
  );
}

export default ProjectBrandingStep;
