import { styled, Typography } from "@mui/material";

const NotFoundText = styled(Typography)(({ theme }) => ({
  fontStyle: "italic",
  color: theme.palette.text.secondary,
  label: "not-found-text",
}));

export default NotFoundText;
