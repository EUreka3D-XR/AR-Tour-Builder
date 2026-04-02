import { useOutletContext } from "react-router";

import { useLocale } from "@/hooks/useLocale";
import ProjectGeneralForm from "./_form/ProjectGeneralForm";
import DangerZone from "./_sections/DangerZone";

function ProjectGeneralPage() {
  const { project, fetchState } = useOutletContext();
  const locale = useLocale();

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

  const projectName =
    (typeof project.title === "object" ? project.title?.[locale] : project.title) || "";

  return (
    <>
      <ProjectGeneralForm defaultValues={defaultValues} />
      <DangerZone projectName={projectName} />
    </>
  );
}

export default ProjectGeneralPage;
