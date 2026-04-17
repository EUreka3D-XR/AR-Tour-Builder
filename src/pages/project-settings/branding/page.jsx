import { useOutletContext } from "react-router";

import ProjectBrandingForm from "./_form/ProjectBrandingForm";

function ProjectBrandingPage() {
  const { project, fetchState } = useOutletContext();

  if (fetchState.isError) {
    return <div>Error loading project data.</div>;
  }
  if (fetchState.isLoading || !project) {
    return <div>Loading...</div>;
  }

  console.log(project);

  const defaultValues = {
    logo: project.logo,
    logoUrl: project.logoUrl,
    coverPhoto: project.coverPhoto,
    coverPhotoUrl: project.coverPhotoUrl,
  };

  return <ProjectBrandingForm defaultValues={defaultValues} />;
}

export default ProjectBrandingPage;
