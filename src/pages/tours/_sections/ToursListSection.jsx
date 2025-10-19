import { useMemo } from "react";
import { useNavigate } from "react-router";
import clsx from "clsx";
import { Box, styled, Typography } from "@mui/material";

import useDashboardParams from "@/hooks/useDashboardParams";
import useNavPaths from "@/hooks/useNavPaths";
import TourCard from "../_components/TourCard";
import ToursMapSection from "./ToursMapSection";

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
  paddingTop: theme.spacing(2),
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

const MapArea = styled(Box)(({ theme }) => ({
  flex: 1,
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
  padding: theme.spacing(0, 2),
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
  const navigate = useNavigate();
  const { searchParams, updateParams } = useDashboardParams();

  const { routes } = useNavPaths();

  const isFullWidth = viewMode === "list";

  const openTour = (tourId) => {
    navigate(routes.tours.one(tourId));
  };

  const handleTourClicked = (tourId) => {
    if (isFullWidth) {
      navigate(routes.tours.one(tourId));
      return;
    }

    updateParams({ tourId });
  };

  const selectedTour = useMemo(() => {
    const tourId = searchParams.get("tourId");
    return tours.find((tour) => tour.id === tourId);
  }, [searchParams, tours]);

  return (
    <ContainerStyled>
      {/* Tours List - Left Side */}
      <ToursListContainer viewMode={viewMode}>
        <Typography variant="h6" sx={{ mb: 0, ml: 2, fontWeight: 600 }}>
          Tours ({tours.length})
        </Typography>

        <ToursScrollableArea>
          {tours.length > 0 ? (
            tours.map((tour) => (
              <TourItem key={tour.id}>
                <TourCard
                  tour={tour}
                  isHighlighted={selectedTour?.id === tour.id}
                  isFullWidth={isFullWidth}
                  onTourClick={handleTourClicked}
                />
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
      <MapArea className={clsx({ show: viewMode === "map" })}>
        <ToursMapSection tour={selectedTour} onOpenTour={openTour} />
      </MapArea>
    </ContainerStyled>
  );
}

export default ToursListSection;
