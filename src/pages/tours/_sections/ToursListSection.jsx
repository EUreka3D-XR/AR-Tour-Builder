import clsx from "clsx";
import { Box, styled, Typography } from "@mui/material";

import TourCard from "../_components/TourCard";

const ContainerStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  height: `calc(100vh - ${theme.custom.headerHeight})`, // Adjust based on your header height
  gap: theme.spacing(3),
  paddingTop: theme.spacing(3),
  position: "relative",
  overflow: "hidden",
}));

const ToursListContainer = styled(Box)(({ viewMode }) => ({
  width: viewMode === "list" ? "100%" : "400px",
  flexShrink: 0,
  display: "flex",
  flexDirection: "column",
  transition: "width 0.3s ease-in-out",
}));

const ToursScrollableArea = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: "auto",
  paddingRight: theme.spacing(1),
  paddingBottom: theme.spacing(6),
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.action.disabled,
    borderRadius: "3px",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

const MapContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundColor: "#f5f5f5",
  borderRadius: theme.spacing(1),
  border: `1px solid ${theme.palette.divider}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
  transition: theme.transitions.create(["transform"], {
    duration: theme.transitions.duration.short,
  }),
  transform: "translateX(100%)",
  opacity: 0,
  visibility: "hidden",
  "&.show": {
    transform: "translateX(0)",
    opacity: 1,
    visibility: "visible",
  },
}));

const TourItem = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  "&:last-child": {
    marginBottom: 0,
  },
}));

/**
 * ToursListSection component for displaying a list of tour cards with map
 * @param {Object} props - ToursListSection props
 * @param {Array} [tours=[]] - Array of tour objects to display
 * @param {'map'|'list'} [viewMode] - Current view mode (e.g., "map" or "list")
 * @returns {React.ReactElement} Rendered tours list section with map
 */
function ToursListSection({ tours = [], viewMode = "list" }) {
  const isFullWidth = viewMode === "list";

  return (
    <ContainerStyled>
      {/* Tours List - Left Side */}
      <ToursListContainer viewMode={viewMode}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Tours ({tours.length})
        </Typography>

        <ToursScrollableArea>
          {tours.length > 0 ? (
            tours.map((tour) => (
              <TourItem key={tour.id}>
                <TourCard tour={tour} isFullWidth={isFullWidth} />
              </TourItem>
            ))
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "200px",
                color: "text.secondary",
              }}
            >
              <Typography variant="body2">No tours found</Typography>
            </Box>
          )}
        </ToursScrollableArea>
      </ToursListContainer>

      {/* Map - Right Side */}
      <MapContainer className={clsx({ show: viewMode === "map" })}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            Map View
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Interactive map will be displayed here
          </Typography>
        </Box>
      </MapContainer>
    </ContainerStyled>
  );
}

export default ToursListSection;
