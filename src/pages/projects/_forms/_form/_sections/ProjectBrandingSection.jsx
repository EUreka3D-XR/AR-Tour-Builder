import HorizontalFieldWrapper from "@/components/horizontal-field-wrapper/HorizontalFieldWrapper";
import ImageInput from "@/components/image-input/ImageInput";
import { ProjectFormSection } from "../_layout/ProjectFormLayout";

function ProjectBrandingSection() {
  return (
    <ProjectFormSection>
      <HorizontalFieldWrapper
        label="Project Logo"
        description="Upload your project logo. This will be displayed on the project homepage and tour listings."
      >
        <ImageInput
          placeholderText="Click to upload Logo"
          maxFileSize={2}
          className="logo-dropzone"
        />
      </HorizontalFieldWrapper>
      <HorizontalFieldWrapper
        label="Cover Photo"
        description="A hero image for your project. This appears at the top of your
            project page and inside the tour cards."
      >
        <ImageInput placeholderText="Click to upload a cover photo" />
      </HorizontalFieldWrapper>
    </ProjectFormSection>
  );
}

export default ProjectBrandingSection;
