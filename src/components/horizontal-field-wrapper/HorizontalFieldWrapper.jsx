import { styled, Typography } from "@mui/material";

const FieldSection = styled("div")(({ theme }) => ({
  padding: theme.spacing(2, 0),
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  alignItems: "start",
  gap: theme.spacing(4),
  "& .field-label": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    "& label": {
      marginBottom: theme.spacing(0.5),
    },
  },
  "& .field-input": {
    "& .logo-dropzone": {
      width: 200,
    },
  },
}));

function HorizontalFieldWrapper({ label, description, children }) {
  return (
    <FieldSection className="field-section">
      <div className="field-label">
        <Typography variant="h5" component="label">
          {label}
        </Typography>
        <Typography color="textSecondary">{description}</Typography>
      </div>
      <div className="field-input">{children}</div>
    </FieldSection>
  );
}

export default HorizontalFieldWrapper;
