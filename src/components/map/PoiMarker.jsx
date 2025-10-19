import { useMemo } from "react";
import { divIcon } from "leaflet";
import { Marker, Tooltip } from "react-leaflet";
import { styled } from "@mui/material";

import placeholderImage from "@/assets/images/image-placeholder.webp";

import "./poi-marker.css";

import { convertToLeafletLatLng } from "./mapConverters";

const ICON_SIZE = 40;
const BORDER_COLOR = "white";

const TooltipStyled = styled(Tooltip)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
}));

/**
 *
 * @param {Object} props
 * @param {import("@/types/jsdoc-types").Coordinates} props.coordinates
 * @param {string} props.thumbnail
 * @param {string} props.title
 * @returns
 */
function PoiMarker({ coordinates, thumbnail, title }) {
  const position = convertToLeafletLatLng(coordinates);

  const icon = useMemo(
    () =>
      divIcon({
        html: `
      <div class="custom-poi-marker" style="width: ${ICON_SIZE}px; height: ${ICON_SIZE}px; border-color: ${BORDER_COLOR}" >
        <img src="${thumbnail}" alt="poi-marker" onerror="this.onerror=null;this.src='${placeholderImage}'"/>
      </div>
    `,
        className: "",
        iconSize: [ICON_SIZE, ICON_SIZE],
      }),
    [thumbnail],
  );

  return (
    <Marker position={position} icon={icon}>
      {/* <Popup>Popup for Marker</Popup> */}
      <TooltipStyled offset={[ICON_SIZE / 2 + 4, 0]}>
        <strong>{title}</strong>
      </TooltipStyled>
    </Marker>
  );
}

export default PoiMarker;
