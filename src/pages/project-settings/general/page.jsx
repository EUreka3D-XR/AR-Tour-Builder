import { useOutletContext } from "react-router";

import ProjectGeneralForm from "./_form/ProjectGeneralForm";

function ProjectGeneralPage() {
  const { project, fetchState } = useOutletContext();

  if (fetchState.isError) {
    return <div>Error loading project data.</div>;
  }
  if (fetchState.isLoading || !project) {
    return <div>Loading...</div>;
  }

  const defaultValues = {
    title: project.title,
    description: project.description,
  };

  return <ProjectGeneralForm defaultValues={defaultValues} />;
}

export default ProjectGeneralPage;
