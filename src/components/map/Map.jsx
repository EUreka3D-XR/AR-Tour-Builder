import { Box, styled, Typography } from "@mui/material";

const ContainerStyled = styled(Box)(({ theme }) => ({
  height: "100%",
  backgroundColor: "#f5f5f5",
  borderRadius: theme.spacing(1),
  border: `1px solid ${theme.palette.divider}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
}));

function Map() {
  return (
    <ContainerStyled className="fake-map">
      <Box sx={{ textAlign: "center" }}>
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

export default Map;
