import { styled, TextField, Typography } from "@mui/material";

import EurekaIcon from "@/components/icon/EurekaIcon";
import ImageInput from "@/components/image-input/ImageInput";
import ProjectFieldWrapper from "./field-wrapper/ProjectFieldWrapper";

const ContainerStyled = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  "& .group-title-section": {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    marginTop: theme.spacing(4),
    paddingBottom: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

function ProjectForm() {
  return (
    <ContainerStyled className="project-form">
      {/* <div className="group-title-section">
        <Typography variant="h4" component="h4" fontWeight={400}>
          Languages
        </Typography>
      </div>
      <ProjectFieldWrapper
        label="Supported Languages"
        description="Specify the languages your project supports."
      >
        <Autocomplete
          fullWidth
          multiple
          options={["English", "French", "German"]}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="e.g., English, Spanish, French"
            />
          )}
        />
      </ProjectFieldWrapper> */}
      <div className="group-title-section">
        <Typography variant="h4" component="h4" fontWeight={400}>
          Basic Information
        </Typography>
      </div>
      <ProjectFieldWrapper
        label="Project Title"
        description="This is the title the project will appear with to the visitors too"
      >
        <TextField fullWidth placeholder="Enter project title" />
      </ProjectFieldWrapper>
      <ProjectFieldWrapper
        label="Description"
        description="A brief overview of your project that helps users understand its
            purpose"
      >
        <TextField
          fullWidth
          placeholder="Enter project description"
          multiline
          rows={4}
        />
      </ProjectFieldWrapper>
      <div className="group-title-section">
        <EurekaIcon name="palette" />
        <Typography variant="h4" component="h4" fontWeight={400}>
          Branding
        </Typography>
      </div>
      <ProjectFieldWrapper
        label="Project Logo"
        description="Upload your project logo. This will be displayed on the project homepage and tour listings."
      >
        <ImageInput
          placeholderText="Click to upload Logo"
          maxFileSize={2}
          className="logo-dropzone"
        />
      </ProjectFieldWrapper>
      <ProjectFieldWrapper
        label="Cover Photo"
        description="A hero image for your project. This appears at the top of your
            project page and inside the tour cards."
      >
        <ImageInput placeholderText="Click to upload a cover photo" />
      </ProjectFieldWrapper>
    </ContainerStyled>
  );
}

export default ProjectForm;
