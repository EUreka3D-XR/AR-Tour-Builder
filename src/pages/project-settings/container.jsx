import { Outlet, useParams } from "react-router";
import { Divider, styled } from "@mui/material";

import { useProjectPopulatedMultilingual } from "@/services/projectsService";
import SettingsHeader from "./_sections/SettingsHeader";
import SettingsNavigationTabs from "./_sections/SettingsNavigationTabs";

const ContainerStyled = styled("div")(({ theme }) => ({
  label: "library-page-container",
  height: "100%",
  padding: theme.spacing(4, 4, 0),
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
}));

const InnerOutletStyled = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  padding: theme.spacing(4, 4),
}));

function ProjectSettingsContainer() {
  const { projectId } = useParams();

  const { data, fetchState } = useProjectPopulatedMultilingual(projectId);

  return (
    <ContainerStyled>
      <SettingsHeader />
      <SettingsNavigationTabs />

      <Divider />
      <InnerOutletStyled>
        <Outlet context={{ project: data, fetchState }} />
      </InnerOutletStyled>
    </ContainerStyled>
  );
}

export default ProjectSettingsContainer;
