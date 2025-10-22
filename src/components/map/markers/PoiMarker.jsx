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
function PoiMarker({ id, coordinates, thumbnail, title, containerRef }) {
  const position = convertToLeafletLatLng(coordinates);
  const icon = useMemo(() => {
    // create DOM nodes to avoid injection and allow reliable event handlers
    const wrapper = document.createElement("div");
    wrapper.className = "custom-poi-marker";
    wrapper.dataset.id = String(id);
    wrapper.style.width = `${ICON_SIZE}px`;
    wrapper.style.height = `${ICON_SIZE}px`;
    wrapper.style.borderColor = BORDER_COLOR;

    const img = document.createElement("img");
    img.alt = "poi-marker";
    img.src = thumbnail || placeholderImage;
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    img.style.objectPosition = "center center";
    img.onerror = () => {
      img.onerror = null;
      img.src = placeholderImage;
    };

    wrapper.appendChild(img);

    return divIcon({
      html: wrapper,
      className: "",
      iconSize: [ICON_SIZE, ICON_SIZE],
    });
  }, [thumbnail, id]);

  return (
    <Marker
      position={position}
      icon={icon}
      eventHandlers={{
        mouseover(e) {
          const el = e.target.getElement();
          if (el) {
            el.dataset.id = id;
            el.classList.add("is-hovered");
            if (containerRef?.current) {
              containerRef.current.dataset.hovered = id;
              const listItem = containerRef.current.querySelector(
                `.poi-item-flex-item[data-id="${id}"]`,
              );
              if (listItem) listItem.classList.add("is-hovered");
            }
          }
        },
        mouseout(e) {
          const el = e.target.getElement();
          if (el) {
            el.classList.remove("is-hovered");
            if (containerRef?.current) {
              delete containerRef.current.dataset.hovered;
              const listItem = containerRef.current.querySelector(
                `.poi-item-flex-item[data-id="${id}"]`,
              );
              if (listItem) listItem.classList.remove("is-hovered");
            }
          }
        },
      }}
    >
      {/* <Popup>Popup for Marker</Popup> */}
      <TooltipStyled offset={[ICON_SIZE / 2 + 4, 0]}>
        <strong>{title}</strong>
      </TooltipStyled>
    </Marker>
  );
}

export default PoiMarker;
