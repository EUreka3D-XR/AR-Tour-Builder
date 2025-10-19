import { useMemo } from "react";
import { alpha, keyframes, Stack, styled, Typography } from "@mui/material";

import Button from "@/components/button/Button";
import EurekaIcon from "@/components/icon/EurekaIcon";
import Map from "@/components/map/Map";
import { convertToLeafletBounds } from "@/components/map/mapConverters";
import MapUIArea from "@/components/map/MapUIArea";
import PoiMarker from "@/components/map/PoiMarker";

const MapUIAreaStyled = styled(MapUIArea)(({ theme }) => ({
  bottom: theme.spacing(0),
  width: "100%",
  "& .map-tour-info-panel": {
    padding: theme.spacing(1.5, 3),
    backgroundColor: alpha(theme.palette.background.paper, 0.8),
    "& .open-tour-btn": {
      animation: `${pulse} 1.8s ease-in-out infinite`,
      fontWeight: "bold",
      textTransform: "none",
      transition: "transform 0.2s",
      "&:hover": {
        transform: "scale(1.05)",
        animation: "none", // stop pulsing when hovered
      },
    },
  },
}));

/**
 *
 * @param {Object} props
 * @param {import("@/types/jsdoc-types").Tour} props.tour
 * @returns
 */
function ToursMapSection({ tour, onOpenTour }) {
  const bounds = useMemo(() => convertToLeafletBounds(tour?.boundBox), [tour]);

  if (!bounds) {
    return null;
  }

  return (
    <Map bounds={bounds}>
      {tour?.pois.map((poi) => (
        <PoiMarker
          key={poi.id}
          title={poi.title}
          coordinates={poi.coordinates}
          thumbnail={poi.thumbnail}
        />
      ))}
      <MapUIAreaStyled>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          className="map-tour-info-panel"
        >
          <Typography variant="h5">{"Viewing Tour: " + tour?.title}</Typography>
          <Button
            variant="filled"
            endIcon={<EurekaIcon name="openInNew" />}
            className="open-tour-btn"
            onClick={() => onOpenTour(tour.id)}
          >
            Open Tour
          </Button>
        </Stack>
      </MapUIAreaStyled>
    </Map>
  );
}

export default ToursMapSection;

const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0.6);
  }
  70% {
    transform: scale(1.08);
    box-shadow: 0 0 0 12px rgba(25, 118, 210, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0);
  }
`;
