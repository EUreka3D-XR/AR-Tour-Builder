import { FormControlLabel, styled } from "@mui/material";

export const NoShrink = styled("div")({ flexShrink: 0 });

export const FormControlLabelStyled = styled(FormControlLabel)(({ theme }) => ({
  alignItems: "flex-start",
  gap: theme.spacing(1),
  "& .checkbox-label": {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(0.25),
  },
}));

export const SubGroup = styled("div")(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  "& .grid": {
    display: "grid",
    gridTemplateColumns: "max-content 1fr",
    gap: theme.spacing(2) /* Row + column gap */,
    alignItems: "start",
    "& .col-1": {
      maxWidth: "200px",
    },
  },
  "& .checkbox-label": {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(0.25),
  },
}));
