import { useParams } from "react-router";
import { useProject } from "@/services/projectsService";

import ProjectBanner from "./sections/ProjectBanner";

function DashboardPage() {
  const { projectId } = useParams();

  const { data: project } = useProject(projectId, "en");

  return <ProjectBanner project={project} />;
}

export default DashboardPage;
