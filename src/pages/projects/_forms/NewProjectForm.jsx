import { FormProvider, useForm } from "react-hook-form";

import ProjectFormFields from "./ProjectFormFields";

function NewProjectForm() {
  const methods = useForm({
    defaultValues: {
      title: {
        locales: {
          en: "",
          fr: "",
        },
      },
      description: {
        locales: {
          en: "",
          fr: "",
        },
      },
    },
  });

  const { control, handleSubmit } = methods;

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form id="create-project-form" onSubmit={handleSubmit(onSubmit)}>
        <ProjectFormFields formControl={control} />;
      </form>
    </FormProvider>
  );
}

export default NewProjectForm;
