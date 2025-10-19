import { MapContainer, TileLayer } from "react-leaflet";
import { Box, styled } from "@mui/material";

import FitBounds from "./FitBounds";

const ContainerStyled = styled(Box)(({ theme }) => ({
  height: "100%",
  backgroundColor: "#f5f5f5",
  borderRadius: theme.spacing(1),
  border: `1px solid ${theme.palette.divider}`,
  "& .map-container": {
    height: "100%",
    width: "100%",
  },
}));
/**
 * Props for Map component. Either `center` or `bounds` is sufficient — provide at least one.
 *
 * @param {Object} props
 * @param {import("leaflet").LatLngBoundsExpression} [props.bounds] - [[southwest], [northeast]]
 * @param {import("leaflet").LatLngExpression} [props.center] - [latitude, longitude]
 * @param {number} [props.zoom]
 * @returns {JSX.Element}
 */
function Map({ bounds, center, zoom = 17, children }) {
  return (
    <ContainerStyled className="map-wrapper">
      <MapContainer
        bounds={bounds}
        center={center}
        zoom={zoom}
        className="map-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds bounds={bounds} />
        {children}
      </MapContainer>
    </ContainerStyled>
  );
}

export default Map;
