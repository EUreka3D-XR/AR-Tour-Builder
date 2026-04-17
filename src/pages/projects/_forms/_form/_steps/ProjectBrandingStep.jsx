import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import HorizontalFieldWrapper from "@/components/horizontal-field-wrapper/HorizontalFieldWrapper";
import ImageInput from "@/components/image-input/ImageInput";
import { ProjectFormSection } from "../_layout/ProjectFormLayout";

function ProjectBrandingStep() {
  const { t } = useTranslation();
  const { watch, setValue } = useFormContext();

  const logoUrl = watch("logoUrl");
  const coverPhotoUrl = watch("coverPhotoUrl");

  return (
    <ProjectFormSection>
      <HorizontalFieldWrapper
        label={t("projects.form.branding.logo.label")}
        description={t("projects.form.branding.logo.description")}
      >
        <ImageInput
          placeholderText={t("projects.form.branding.logo.placeholder")}
          maxFileSize={2}
          className="logo-dropzone"
          value={logoUrl}
          onUpload={(url, id) => {
            setValue("logo", id, { shouldDirty: true });
            setValue("logoUrl", url);
          }}
        />
      </HorizontalFieldWrapper>
      <HorizontalFieldWrapper
        label={t("projects.form.branding.coverPhoto.label")}
        description={t("projects.form.branding.coverPhoto.description")}
      >
        <ImageInput
          placeholderText={t("projects.form.branding.coverPhoto.placeholder")}
          value={coverPhotoUrl}
          onUpload={(url, id) => {
            setValue("coverPhoto", id, { shouldDirty: true });
            setValue("coverPhotoUrl", url);
          }}
        />
      </HorizontalFieldWrapper>
    </ProjectFormSection>
  );
}

export default ProjectBrandingStep;
