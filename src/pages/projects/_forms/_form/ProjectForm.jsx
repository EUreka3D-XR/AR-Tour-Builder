import { Divider } from "@mui/material";

import ProjectFormMain from "./_layout/ProjectFormMain";
import ProjectFormNavigationTabs from "./_layout/ProjectFormNavigationTabs";

function ProjectForm({ onSubmit }) {
  return (
    <form id="create-project-form" onSubmit={onSubmit}>
      <ProjectFormNavigationTabs
        tabs={projectTabs}
        fieldsPerStep={fieldsPerStep}
      />
      <Divider />
      <ProjectFormMain />
    </form>
  );
}

export default ProjectForm;

const projectTabs = [
  { icon: "diamond_shine", value: "languages", label: "Supported Languages" },
  { icon: "info", value: "basic-info", label: "Basic Information" },
  { icon: "language", value: "branding", label: "Branding" },
];
// const steps = projectTabs.map((tab) => tab.value);
const fieldsPerStep = [
  ["locales"],
  ["title", "description"],
  ["logo", "coverPhoto"],
];
