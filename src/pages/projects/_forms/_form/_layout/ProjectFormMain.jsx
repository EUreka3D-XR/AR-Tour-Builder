import { styled } from "@mui/material";

import useParamsTabs from "@/hooks/useParamsTabs";
import ProjectBasicSection from "../_sections/ProjectBasicSection";
import ProjectBrandingSection from "../_sections/ProjectBrandingSection";
import ProjectLanguageSection from "../_sections/ProjectLanguageSection";

const MainAreaStyled = styled("div")(({ theme }) => ({
  padding: theme.spacing(5),
}));

function ProjectFormMain() {
  const { activeTab } = useParamsTabs("projectTab");

  return (
    <MainAreaStyled>
      {activeTab === "languages" && <ProjectLanguageSection />}
      {activeTab === "basic-info" && <ProjectBasicSection />}
      {activeTab === "branding" && <ProjectBrandingSection />}
    </MainAreaStyled>
  );
}

export default ProjectFormMain;
