import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Marker, useMap, useMapEvents } from "react-leaflet";
import { Box } from "@mui/material";

/**
 * PlaceableMarker
 * - When no marker is present, shows a tooltip following the cursor that says "click to place a marker"
 * - Click places a default draggable marker (unless the user was panning)
 * - Subsequent marker is draggable and its position is kept in local state
 *
 * Props:
 * - initialPosition?: LatLngLiteral | null
 * - onChange?: (latlng) => void
 */
export default function PlaceableMarker({ initialPosition = null, onChange }) {
  const map = useMap();
  const [position, setPosition] = useState(initialPosition);

  // tooltip container appended to the leaflet container
  const tooltipContainerRef = useRef(null);
  const [tooltipReady, setTooltipReady] = useState(false);

  // track container point to position tooltip
  const containerPointRef = useRef({ x: 0, y: 0 });

  // detect map move (panning) to ignore clicks caused by pan
  const isMovingRef = useRef(false);

  // small movement threshold to distinguish click vs drag (pixels)
  const CLICK_THRESHOLD = 6;
  const mouseDownPointRef = useRef(null);

  useEffect(() => {
    const container = map.getContainer();
    const el = document.createElement("div");
    el.style.position = "absolute";
    el.style.left = "0px";
    el.style.top = "0px";
    el.style.pointerEvents = "none"; // allow clicks through
    el.style.zIndex = 9999;
    tooltipContainerRef.current = el;
    container.appendChild(el);
    setTooltipReady(true);

    return () => {
      setTooltipReady(false);
      if (
        tooltipContainerRef.current &&
        tooltipContainerRef.current.parentNode
      ) {
        tooltipContainerRef.current.parentNode.removeChild(
          tooltipContainerRef.current,
        );
        tooltipContainerRef.current = null;
      }
    };
  }, [map]);

  // Set cursor to copy while no marker has been placed
  useEffect(() => {
    const container = map.getContainer();
    const prev = container.style.cursor;
    if (!position) {
      container.style.cursor = "copy";
    } else {
      container.style.cursor = prev;
    }

    return () => {
      // restore previous cursor on unmount
      if (container && container.style) container.style.cursor = prev;
    };
  }, [map, position]);

  // Update tooltip position by setting the tooltip container transform
  const updateTooltipPos = (containerPoint) => {
    containerPointRef.current = containerPoint;
    const el = tooltipContainerRef.current;
    if (!el) return;
    el.style.transform = `translate(${containerPoint.x}px, ${containerPoint.y}px)`;
  };

  useMapEvents({
    mousemove: (e) => {
      if (position) return; // only show tooltip when placing
      if (e?.containerPoint) updateTooltipPos(e.containerPoint);
    },
    mousedown: (e) => {
      // record where pointer went down
      mouseDownPointRef.current = e?.containerPoint || null;
    },
    movestart: () => {
      isMovingRef.current = true;
    },
    moveend: () => {
      // small delay to ensure movestart/moveend aren't overlapping events
      isMovingRef.current = false;
    },
    mouseup: (e) => {
      // only place if currently not moving and the mouse didn't travel far
      if (position) return; // already placed
      const down = mouseDownPointRef.current;
      mouseDownPointRef.current = null;
      if (!down || !e?.containerPoint) return;
      const dx = down.x - e.containerPoint.x;
      const dy = down.y - e.containerPoint.y;
      const dist = Math.hypot(dx, dy);
      if (dist > CLICK_THRESHOLD) return;
      if (isMovingRef.current) return;

      // treat as click -> place marker
      const latlng = e.latlng;
      setPosition(latlng);
      if (typeof onChange === "function") onChange(latlng);
    },
  });

  // drag end handler
  const handleDragEnd = (e) => {
    const latlng = e.target.getLatLng();
    setPosition(latlng);
    if (typeof onChange === "function") onChange(latlng);
  };

  // render tooltip into appended container
  const tooltip = (
    <Box
      sx={{
        transform: "translate(-50%, -140%)",
        pointerEvents: "none",
        whiteSpace: "nowrap",
        bgcolor: "background.paper",
        px: 1,
        py: 0.5,
        borderRadius: 1,
        boxShadow: 2,
        fontSize: 12,
      }}
    >
      Click to place a marker
    </Box>
  );

  return (
    <>
      {tooltipReady && !position
        ? ReactDOM.createPortal(tooltip, tooltipContainerRef.current)
        : null}

      {position ? (
        <Marker
          position={position}
          draggable
          eventHandlers={{ dragend: handleDragEnd }}
        />
      ) : null}
    </>
  );
}
