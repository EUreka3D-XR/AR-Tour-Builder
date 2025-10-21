import { useNavigate } from "react-router";
import { FormProvider, useForm } from "react-hook-form";

import useNavPaths from "@/hooks/useNavPaths";
import wait from "@/utils/wait";
import ProjectForm from "./ProjectForm";

function CreateProjectForm() {
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

  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    console.log(data);
    wait(1000).then(() => {
      navigate(`${routes.projects.one("new-project-id")}`);
    });
  };

  return (
    <FormProvider {...methods}>
      <ProjectForm onSubmit={handleSubmit(onSubmit)} />;
    </FormProvider>
  );
}

export default CreateProjectForm;
