import { useParams } from "react-router";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useUpdateProject } from "@/services/projectsService";
import HorizontalFieldWrapper from "@/components/horizontal-field-wrapper/HorizontalFieldWrapper";
import ImageInput from "@/components/image-input/ImageInput";
import { SettingsFormLayout } from "../../_sections/SettingsFormLayout";
import SettingsSaveRow from "../../_sections/SettingsSaveRow";

function ProjectBrandingForm({ defaultValues }) {
  const { t } = useTranslation();
  const { projectId } = useParams();
  const { mutate: updateProject } = useUpdateProject(projectId);

  const methods = useForm({ defaultValues });
  const { handleSubmit, watch, setValue, reset } = methods;

  const logoUrl = watch("logoUrl");
  const coverPhotoUrl = watch("coverPhotoUrl");

  const onSubmit = async (data) => {
    const newData = await updateProject({ data });
    reset({
      logo: newData.logo,
      logoUrl: newData.logoUrl,
      coverPhoto: newData.coverPhoto,
      coverPhotoUrl: newData.coverPhotoUrl,
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SettingsFormLayout>
          <HorizontalFieldWrapper
            label={t("projects.form.branding.logo.label")}
            description={t("projects.form.branding.logo.description")}
          >
            <ImageInput
              placeholderText={t("projects.form.branding.logo.placeholder")}
              maxFileSize={2}
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
          <SettingsSaveRow />
        </SettingsFormLayout>
      </form>
    </FormProvider>
  );
}

export default ProjectBrandingForm;
