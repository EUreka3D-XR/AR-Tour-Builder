import { TextField } from "@mui/material";

import FormInputMultilingual from "@/components/form/FormInputMultilingual";
import HorizontalFieldWrapper from "@/components/horizontal-field-wrapper/HorizontalFieldWrapper";
import { ProjectFormSection } from "../_layout/ProjectFormLayout";

function ProjectBasicSection() {
  return (
    <ProjectFormSection>
      <HorizontalFieldWrapper
        label="Project Title"
        description="This is the title the project will appear with to the visitors too"
      >
        <FormInputMultilingual
          name="title"
          render={({ field }) => (
            <TextField fullWidth placeholder="Enter project title" {...field} />
          )}
        />
      </HorizontalFieldWrapper>
      <HorizontalFieldWrapper
        label="Description"
        description="A brief overview of your project that helps users understand its
            purpose"
      >
        <FormInputMultilingual
          name="description"
          render={({ field }) => (
            <TextField
              fullWidth
              placeholder="Enter project description"
              multiline
              rows={4}
              {...field}
            />
          )}
        />
      </HorizontalFieldWrapper>
    </ProjectFormSection>
  );
}

export default ProjectBasicSection;
