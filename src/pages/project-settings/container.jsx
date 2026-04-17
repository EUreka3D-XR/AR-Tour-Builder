import { Outlet, useParams } from "react-router";
import { Divider, styled } from "@mui/material";

import { useProjectPopulatedMultilingual } from "@/services/projectsService";
import SettingsHeader from "./_sections/SettingsHeader";
import SettingsNavigationTabs from "./_sections/SettingsNavigationTabs";

const ContainerStyled = styled("div")(({ theme }) => ({
  label: "library-page-container",
  height: "100%",
  padding: theme.spacing(4, 0, 0),
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
}));

const PaddingStyled = styled("div")(({ theme }) => ({
  label: "padding-container",
  padding: theme.spacing(0, 4),
}));

const InnerOutletStyled = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  padding: theme.spacing(4, 0),
}));

function ProjectSettingsContainer() {
  const { projectId } = useParams();

  const { data, fetchState } = useProjectPopulatedMultilingual(projectId);

  return (
    <ContainerStyled>
      <PaddingStyled>
        <SettingsHeader />
      </PaddingStyled>
      <SettingsNavigationTabs />

      <Divider />
      <PaddingStyled>
        <InnerOutletStyled>
          <Outlet context={{ project: data, fetchState }} />
        </InnerOutletStyled>
      </PaddingStyled>
    </ContainerStyled>
  );
}

export default ProjectSettingsContainer;
