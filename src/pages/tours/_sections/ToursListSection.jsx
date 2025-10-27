import { useMemo, useRef } from "react";
import { useNavigate } from "react-router";
import clsx from "clsx";
import { Box, Skeleton, styled, Typography } from "@mui/material";

import CenteredArea from "@/components/centered/Centered";
import ErrorArea from "@/components/error/ErrorArea";
import useDashboardParams from "@/hooks/useDashboardParams";
import useNavPaths from "@/hooks/useNavPaths";
import TourCard from "../_components/TourCard";
import ToursMapSection from "./ToursMapSection";
import useMapResizeObserver from "./useMapResizeObserver";

const ContainerStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  height: `calc(100vh - ${theme.custom.headerHeight})`, // Adjust based on your header height
  gap: theme.spacing(3),
  paddingTop: theme.spacing(3),
  position: "relative",
  overflow: "hidden",
}));

const ToursListContainer = styled(Box)(() => ({
  width: "400px",
  flexShrink: 0,
  display: "flex",
  flexDirection: "column",
  transition: "width 0.3s ease-in-out",
  "&.full-width": {
    width: "100%",
  },
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
 * @returns {React.ReactElement} Rendered tours list section with map
 */
function ToursListSection({ tours = [], fetchState }) {
  const navigate = useNavigate();
  const { searchParams, updateParams } = useDashboardParams();
  const viewMode = searchParams.get("viewMode") ?? "list";

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

  const mapAreaRef = useRef(null);
  const { mapReady } = useMapResizeObserver(mapAreaRef, viewMode);

  if (fetchState.isError) {
    return (
      <ContainerStyled className="tours-main-area">
        <CenteredArea sx={{ mt: -8 }}>
          <ErrorArea hideGoBack />
        </CenteredArea>
      </ContainerStyled>
    );
  }

  if (fetchState.isSuccess && tours.length === 0) {
    return (
      <ContainerStyled className="tours-main-area">
        <CenteredArea sx={{ mt: -8 }}>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            No tours found. Please create a new tour to get started.
          </Typography>
        </CenteredArea>
      </ContainerStyled>
    );
  }

  return (
    <ContainerStyled className="tours-main-area">
      {/* Tours List - Left Side */}
      <ToursListContainer className={clsx({ "full-width": isFullWidth })}>
        <Typography variant="h6" sx={{ mb: 0, ml: 2, fontWeight: 600 }}>
          Tours ({tours.length})
        </Typography>

        <ToursScrollableArea>
          {fetchState.isLoading &&
            Array.from({ length: 2 }).map((_, i) => (
              <TourItem key={i}>
                <TourCard.Skeleton isFullWidth={isFullWidth} />
              </TourItem>
            ))}

          {fetchState.isSuccess &&
            tours?.map((tour) => (
              <TourItem key={tour.id}>
                <TourCard
                  tour={tour}
                  isHighlighted={selectedTour?.id === tour.id}
                  isFullWidth={isFullWidth}
                  onTourClick={handleTourClicked}
                />
              </TourItem>
            ))}
        </ToursScrollableArea>
      </ToursListContainer>

      {/* Map - Right Side */}
      <MapArea ref={mapAreaRef} className={clsx({ show: !isFullWidth })}>
        {selectedTour && mapReady ? (
          <ToursMapSection tour={selectedTour} onOpenTour={openTour} />
        ) : (
          <Skeleton height="100%" />
        )}
      </MapArea>
    </ContainerStyled>
  );
}

export default ToursListSection;
