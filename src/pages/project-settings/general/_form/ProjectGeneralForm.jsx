import { useParams } from "react-router";
import { FormProvider, useForm } from "react-hook-form";
import { Stack, TextField } from "@mui/material";

import { useUpdateProject } from "@/services/projectsService";
import Button from "@/components/button/Button";
import FormInputMultilingual from "@/components/form/FormInputMultilingual";
import HorizontalFieldWrapper from "@/components/horizontal-field-wrapper/HorizontalFieldWrapper";
import EurekaIcon from "@/components/icon/EurekaIcon";
import LanguageDropdown from "@/components/language-dropdown/LanguageDropdown";
import { SettingsFormLayout } from "../../_sections/SettingsFormLayout";

function ProjectGeneralForm({ defaultValues }) {
  const { projectId } = useParams();
  const { mutate: updateProject } = useUpdateProject(projectId);
  const methods = useForm({
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    updateProject({ data });
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
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            spacing={1}
            mt={6}
          >
            <Button
              type="submit"
              variant="filled"
              startIcon={<EurekaIcon name="save" />}
            >
              Save Changes
            </Button>
          </Stack>
        </SettingsFormLayout>
      </form>
    </FormProvider>
  );
}

export default ProjectGeneralForm;
