import { useParams } from "react-router";
import { FormProvider, useForm } from "react-hook-form";
import { Stack, TextField } from "@mui/material";

import { useUpdateProject } from "@/services/projectsService";
import FormInputMultilingual from "@/components/form/FormInputMultilingual";
import HorizontalFieldWrapper from "@/components/horizontal-field-wrapper/HorizontalFieldWrapper";
import LanguageDropdown from "@/components/language-dropdown/LanguageDropdown";
import { SettingsFormLayout } from "../../_sections/SettingsFormLayout";
import SettingsSaveRow from "../../_sections/SettingsSaveRow";

function ProjectGeneralForm({ defaultValues }) {
  const { projectId } = useParams();
  const { mutate: updateProject } = useUpdateProject(projectId);
  const methods = useForm({
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data) => {
    const newData = await updateProject({ data });
    reset({
      title: newData.title,
      description: newData.description,
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SettingsFormLayout>
          <Stack direction="row" justifyContent="flex-end">
            <LanguageDropdown />
          </Stack>
          <HorizontalFieldWrapper
            label="Project Title"
            description="This is the title the project will appear with to the visitors too"
            isMultilingual
          >
            <FormInputMultilingual
              name="title"
              render={({ field, formState }) => {
                return (
                  <TextField
                    fullWidth
                    placeholder="Enter project title"
                    error={!!formState.errors.title}
                    helperText={formState.errors.title?.message}
                    {...field}
                  />
                );
              }}
            />
          </HorizontalFieldWrapper>
          <HorizontalFieldWrapper
            label="Description"
            description="A brief overview of your project that helps users understand its
            purpose"
            isMultilingual
          >
            <FormInputMultilingual
              name="description"
              render={({ field, formState }) => {
                return (
                  <TextField
                    fullWidth
                    placeholder="Enter project description"
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
          <SettingsSaveRow />
        </SettingsFormLayout>
      </form>
    </FormProvider>
  );
}

export default ProjectGeneralForm;
