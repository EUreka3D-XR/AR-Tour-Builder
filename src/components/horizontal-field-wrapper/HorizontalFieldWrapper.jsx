import { styled, Typography } from "@mui/material";

import EurekaIcon from "../icon/EurekaIcon";
import { icons } from "../icon/icons";

const FieldSection = styled("div")(({ theme }) => ({
  padding: theme.spacing(2, 0),
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  alignItems: "start",
  gap: theme.spacing(4),
  "& .field-label-wrapper": {
    display: "flex",
    gap: theme.spacing(2),
  },
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
  "& .icon-wrapper": {
    marginTop: theme.spacing(0.5),
    "& .label-icon": {
      color: theme.palette.text.secondary,
    },
  },
}));

function HorizontalFieldWrapper({
  label,
  description,
  children,
  isMultilingual,
}) {
  return (
    <FieldSection className="field-section">
      <div className="field-label-wrapper">
        {isMultilingual && (
          <div className="icon-wrapper">
            <EurekaIcon
              name={icons.language}
              // fontSize="small"
              className="label-icon"
            />
          </div>
        )}
        <div className="field-label">
          <Typography variant="h5" component="label">
            {label}
          </Typography>
          <Typography color="textSecondary">{description}</Typography>
        </div>
      </div>
      <div className="field-input">{children}</div>
    </FieldSection>
  );
}

export default HorizontalFieldWrapper;
