import { styled, TextField, Typography } from "@mui/material";

import EurekaIcon from "@/components/icon/EurekaIcon";

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

const FieldSection = styled("div")(({ theme }) => ({
  padding: theme.spacing(2, 0),
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  alignItems: "start",
  gap: theme.spacing(2),
  "& .field-label": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    "& label": {
      marginBottom: theme.spacing(0.5),
    },
  },
  "& .field-input": {},
}));

function ProjectForm() {
  return (
    <ContainerStyled className="project-form">
      <div className="group-title-section">
        <Typography variant="h4" component="h4" fontWeight={400}>
          Basic Information
        </Typography>
      </div>
      <FieldSection className="field-section">
        <div className="field-label">
          <Typography variant="h5" component="label">
            Project Title
          </Typography>
          <Typography color="textSecondary">
            This is the title the project will appear with to the visitors too
          </Typography>
        </div>
        <div className="field-input">
          <TextField fullWidth placeholder="Enter project title" />
        </div>
      </FieldSection>
      <FieldSection className="field-section">
        <div className="field-label">
          <Typography variant="h5" component="label">
            Description
          </Typography>
          <Typography color="textSecondary">
            A brief overview of your project that helps users understand its
            purpose
          </Typography>
        </div>
        <div className="field-input">
          <TextField
            fullWidth
            placeholder="Enter project description"
            multiline
            rows={4}
          />
        </div>
      </FieldSection>
      <div className="group-title-section">
        <EurekaIcon name="palette" />
        <Typography variant="h4" component="h4" fontWeight={400}>
          Branding
        </Typography>
      </div>
      <FieldSection className="field-section">
        <div className="field-label">
          <Typography variant="h5" component="label">
            Project Logo
          </Typography>
          <Typography color="textSecondary">
            Upload your project logo. This will be displayed on the project
            homepage and tour listings.
          </Typography>
        </div>
        <div className="field-input">
          <TextField fullWidth placeholder="Enter project title" />
        </div>
      </FieldSection>
      <FieldSection className="field-section">
        <div className="field-label">
          <Typography variant="h5" component="label">
            Cover Photo
          </Typography>
          <Typography color="textSecondary">
            A hero image for your project. This appears at the top of your
            project page and inside the tour cards.
          </Typography>
        </div>
        <div className="field-input">
          <TextField fullWidth placeholder="Enter project title" />
        </div>
      </FieldSection>
    </ContainerStyled>
  );
}

export default ProjectForm;
