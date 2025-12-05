import { styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { useProjects } from "@/services/projectsService";
import Button from "@/components/button/Button";
import CenteredArea from "@/components/centered/Centered";
import EurekaIcon from "@/components/icon/EurekaIcon";
import useNavPaths from "@/hooks/useNavPaths";
import ProjectCard from "./_components/ProjectCard";

const ContainerStyled = styled("div")({
  margin: "auto",
  maxWidth: "1200px",
  padding: "2rem",
  "& .header": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  "& .subtitle": {
    maxWidth: "600px",
  },
});

const ProjectsGrid = styled("div")({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "1.5rem",
  marginTop: "2rem",
  "& .grid-item": {
    flex: "1 1 calc(50% - 0.75rem)",
    minWidth: "300px",
    maxWidth: "500px",
  },
});

const ErrorSection = styled(CenteredArea)({
  height: "400px",
});

function ProjectsPage() {
  const { t } = useTranslation();
  const { data: projects, fetchState } = useProjects();
  const { routes } = useNavPaths();

  return (
    <ContainerStyled>
      <div className="header">
        <Typography variant="h2" component="h2" gutterBottom>
          {t("projects.page.title")}
        </Typography>
        <Button
          variant="filled"
          startIcon={<EurekaIcon name="add" />}
          href={routes.projects.new}
        >
          {t("projects.page.newProjectButton")}
        </Button>
      </div>
      <Typography color="textSecondary" className="subtitle">
        {t("projects.page.subtitle")}
      </Typography>

      {fetchState.isError && (
        <ErrorSection>
          <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
            {t("projects.page.error")}
          </Typography>
        </ErrorSection>
      )}
      {fetchState.isSuccess && !projects?.length && (
        <ErrorSection>
          <Typography
            variant="subtitle1"
            sx={{ textAlign: "center" }}
            dangerouslySetInnerHTML={{ __html: t("projects.page.empty") }}
          />
        </ErrorSection>
      )}
      <ProjectsGrid>
        {fetchState.isLoading &&
          Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="grid-item">
              <ProjectCard.Skeleton />
            </div>
          ))}
        {fetchState.isSuccess &&
          Boolean(projects?.length) &&
          projects?.map((project) => (
            <div key={project.id} className="grid-item">
              <ProjectCard project={project} />
            </div>
          ))}
      </ProjectsGrid>
    </ContainerStyled>
  );
}

export default ProjectsPage;
