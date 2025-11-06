import { styled } from "@mui/material";

import useParamsTabs from "@/hooks/useParamsTabs";
import ProjectBasicStep from "../_steps/ProjectBasicStep";
import ProjectBrandingStep from "../_steps/ProjectBrandingStep";
import ProjectLanguageStep from "../_steps/ProjectLanguageStep";

const MainAreaStyled = styled("div")(({ theme }) => ({
  padding: theme.spacing(5),
}));

function ProjectFormMain() {
  const { activeTab } = useParamsTabs("projectTab");

  return (
    <MainAreaStyled>
      {activeTab === "languages" && <ProjectLanguageStep />}
      {activeTab === "basic-info" && <ProjectBasicStep />}
      {activeTab === "branding" && <ProjectBrandingStep />}
    </MainAreaStyled>
  );
}

export default ProjectFormMain;
