import { useNavigate } from "react-router";
import {
  projectBasicInfoSchema,
  projectBrandingSchema,
  projectLanguagesSchema,
} from "@/validation-schemas/projectSchema";

import useNavPaths from "@/hooks/useNavPaths";
import wait from "@/utils/wait";
import ProjectForm from "./_form/ProjectForm";

function CreateProjectForm() {
  const { routes } = useNavPaths();
  const navigate = useNavigate();

  const validationSchemas = [
    projectLanguagesSchema,
    projectBasicInfoSchema,
    projectBrandingSchema,
  ];

  const defaultValues = {
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
    locales: ["en"],
    logo: "",
    coverPhoto: "",
  };

  const onSubmit = (data) => {
    console.log(data);
    wait(1000).then(() => {
      navigate(`${routes.projects.one("new-project-id")}`);
    });
  };

  return (
    <ProjectForm
      isNew
      defaultValues={defaultValues}
      validationSchemas={validationSchemas}
      onSubmit={onSubmit}
    />
  );
}

export default CreateProjectForm;
