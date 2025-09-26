import { Box, styled, Typography } from "@mui/material";

const ContainerStyled = styled("div")(({ theme }) => ({
  flex: 1,
  backgroundColor: "#f5f5f5",
  borderLeft: `1px solid ${theme.palette.divider}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
}));

function TourMapSection() {
  return (
    <ContainerStyled>
      <Box className="center-content">
        <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
          Map View
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Interactive map will be displayed here
        </Typography>
      </Box>
    </ContainerStyled>
  );
}

export default TourMapSection;
