import { useEffect } from "react";
import { useMap } from "react-leaflet";

/**
 *
 * @param {Object} props
 * @param {import("leaflet").LatLngBoundsExpression} props.bounds
 * @returns {null}
 */
function FitBounds({ bounds }) {
  const map = useMap();

  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds);
    }
  }, [bounds, map]);

  return null;
}

export default FitBounds;
