import { styled, TextField, Typography } from "@mui/material";

import FormInputMultilingual from "@/components/form/FormInputMultilingual";
import HorizontalFieldWrapper from "@/components/horizontal-field-wrapper/HorizontalFieldWrapper";
import EurekaIcon from "@/components/icon/EurekaIcon";
import ImageInput from "@/components/image-input/ImageInput";

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

function ProjectForm({ onSubmit }) {
  return (
    <form id="create-project-form" onSubmit={onSubmit}>
      <ContainerStyled className="project-form">
        {/* <div className="group-title-section">
        <Typography variant="h4" component="h4" fontWeight={400}>
          Languages
        </Typography>
      </div>
      <HorizontalFieldWrapper
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
      </HorizontalFieldWrapper> */}
        <div className="group-title-section">
          <Typography variant="h4" component="h4" fontWeight={400}>
            Basic Information
          </Typography>
        </div>
        <HorizontalFieldWrapper
          label="Project Title"
          description="This is the title the project will appear with to the visitors too"
        >
          <FormInputMultilingual
            name="title"
            render={({ field }) => (
              <TextField
                fullWidth
                placeholder="Enter project title"
                {...field}
              />
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
        <div className="group-title-section">
          <EurekaIcon name="palette" />
          <Typography variant="h4" component="h4" fontWeight={400}>
            Branding
          </Typography>
        </div>
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
      </ContainerStyled>
    </form>
  );
}

export default ProjectForm;
