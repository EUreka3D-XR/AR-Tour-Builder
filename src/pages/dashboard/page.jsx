import { useParams } from "react-router";
import { useProject } from "@/services/projectsService";

import ProjectBanner from "./sections/ProjectBanner";

function DashboardPage() {
  const { projectId } = useParams();

  const { data: project } = useProject(projectId, "en");

  return (
    <ProjectBanner
      logo={project?.thumbnail}
      cover={project?.coverPhoto}
      title={project?.title}
      description={project?.description}
    />
  );
}

export default DashboardPage;
