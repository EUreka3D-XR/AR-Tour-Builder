import { useParams } from "react-router";
import { FormProvider, useForm } from "react-hook-form";

import { useUpdateProject } from "@/services/projectsService";
import FormInput from "@/components/form/FormInput";
import HorizontalFieldWrapper from "@/components/horizontal-field-wrapper/HorizontalFieldWrapper";
import SupportedLanguagesInput from "@/components/languages-input/supported/SupportedLanguagesInput";
import { SettingsFormLayout } from "../../_sections/SettingsFormLayout";
import SettingsSaveRow from "../../_sections/SettingsSaveRow";

function ProjectLanguagesForm({ defaultValues }) {
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
          <HorizontalFieldWrapper
            label="Supported Languages"
            description="Specify the languages your project supports. You can populate content in multiple languages later in the project's settings."
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
