import {
  projectBasicInfoSchema,
  projectBrandingSchema,
  projectLanguagesSchema,
} from "@/validation-schemas/projectSchema";

import { useCreateProject } from "@/services/projectsService";
import useNavPaths from "@/hooks/useNavPaths";
import ProjectForm from "./_form/ProjectForm";

function CreateProjectForm() {
  const { navigate, routes } = useNavPaths();
  const { mutate: createProject } = useCreateProject();

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

  const onSubmit = async (data) => {
    const newProject = await createProject({ data });
    navigate(routes.projects.one(newProject.id));
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
