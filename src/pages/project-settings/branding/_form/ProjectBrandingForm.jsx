import { useParams } from "react-router";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useUpdateProject } from "@/services/projectsService";
import FormImageInput from "@/components/form/FormImageInput";
import HorizontalFieldWrapper from "@/components/horizontal-field-wrapper/HorizontalFieldWrapper";
import { SettingsFormLayout } from "../../_sections/SettingsFormLayout";
import SettingsSaveRow from "../../_sections/SettingsSaveRow";

function ProjectBrandingForm({ defaultValues }) {
  const { t } = useTranslation();
  const { projectId } = useParams();
  const { mutate: updateProject } = useUpdateProject(projectId);

  const methods = useForm({ defaultValues });
  const { handleSubmit, reset } = methods;

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
            <FormImageInput
              idName="logo"
              urlName="logoUrl"
              placeholderText={t("projects.form.branding.logo.placeholder")}
              maxFileSize={2}
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
          <SettingsSaveRow />
        </SettingsFormLayout>
      </form>
    </FormProvider>
  );
}

export default ProjectBrandingForm;
