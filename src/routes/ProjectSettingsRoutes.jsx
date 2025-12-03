import { Route, Routes } from "react-router";
import ProjectBrandingPage from "@/pages/project-settings/branding/page";
import ProjectSettingsContainer from "@/pages/project-settings/container";
import ProjectGeneralPage from "@/pages/project-settings/general/page";
import ProjectLanguagesPage from "@/pages/project-settings/languages/page";
import ProjectMembersPage from "@/pages/project-settings/members/page";

function ProjectSettingsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProjectSettingsContainer />}>
        <Route index element={<></>} />
        <Route path="general" element={<ProjectGeneralPage />} />
        <Route path="languages" element={<ProjectLanguagesPage />} />
        <Route path="members" element={<ProjectMembersPage />} />
        <Route path="branding" element={<ProjectBrandingPage />} />
      </Route>
    </Routes>
  );
}

export default ProjectSettingsRoutes;
