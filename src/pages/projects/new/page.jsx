import { useTranslation } from "react-i18next";
import { IconButton, Stack, styled, Typography } from "@mui/material";

import EurekaIcon from "@/components/icon/EurekaIcon";
import Link from "@/components/link/Link";
import useNavPaths from "@/hooks/useNavPaths";
import CreateProjectForm from "../_forms/CreateProjectForm";

const ContainerStyled = styled("div")({
  margin: "auto",
  maxWidth: "1200px",
  padding: "2rem",
  "& .top-action": {
    marginBottom: "1rem",
  },
  "& .header": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& .actions": {
      display: "flex",
      gap: "1rem",
    },
  },
  "& .subtitle": {
    maxWidth: "600px",
  },
  "& .project-form-section": {
    marginTop: "2rem",
  },
});

function NewProjectPage() {
  const { t } = useTranslation();
  const { routes } = useNavPaths();
  return (
    <ContainerStyled>
      <div className="top-action">
        <Link to={routes.projects.index}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton>
              <EurekaIcon name="back" />
            </IconButton>
            <span className="header-title">
              {t("project_new.back_to_projects")}
            </span>
          </Stack>
        </Link>
      </div>
      <div className="header">
        <Typography variant="h2" component="h2" gutterBottom>
          {t("project_new.title")}
        </Typography>
      </div>
      <Typography color="textSecondary" className="subtitle">
        {t("project_new.subtitle")}
      </Typography>
      <div className="project-form-section">
        <CreateProjectForm />
      </div>
    </ContainerStyled>
  );
}

export default NewProjectPage;
