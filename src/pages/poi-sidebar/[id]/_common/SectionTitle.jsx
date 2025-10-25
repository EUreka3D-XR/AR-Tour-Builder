import { Typography } from "@mui/material";

function SectionTitle({ children }) {
  return (
    <Typography variant="h6" mb={1} fontWeight="600">
      {children}
    </Typography>
  );
}

export default SectionTitle;
