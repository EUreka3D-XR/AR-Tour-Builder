import { useOutletContext } from "react-router";

import ProjectLanguagesForm from "./_form/ProjectLanguagesForm";

function ProjectLanguagesPage() {
  const { project, fetchState } = useOutletContext();

  if (fetchState.isError) {
    return <div>Error loading project supported languages.</div>;
  }
  if (fetchState.isLoading || !project) {
    return <div>Loading...</div>;
  }

  const defaultValues = {
    locales: project.locales,
  };
  return <ProjectLanguagesForm defaultValues={defaultValues} />;
}

export default ProjectLanguagesPage;
