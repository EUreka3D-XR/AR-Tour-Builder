import { useNavigate } from "react-router";
import { FormProvider, useForm } from "react-hook-form";

import useNavPaths from "@/hooks/useNavPaths";
import wait from "@/utils/wait";
import ProjectFormFields from "./ProjectFormFields";

function NewProjectForm() {
  const { routes } = useNavPaths();
  const navigate = useNavigate();

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
    wait(1000).then(() => {
      navigate(`${routes.projects.one("new-project-id")}`);
    });
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
