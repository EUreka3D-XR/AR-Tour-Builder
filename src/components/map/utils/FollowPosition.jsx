import { useEffect } from "react";
import { useMap } from "react-leaflet";

const PREFERABLE_ZOOM = 17;
// max zoom is 18

/**
 * FollowPosition
 * Re-centers the map to `coordinates` and zooms to `maxZoom` when coordinates change.
 * @param {Object} props
 * @param {import("@/types/jsdoc-types").Coordinates | null} props.coordinates The target coordinates to follow
 * @param {number} [props.maxZoom=null] (default: map.getMaxZoom() or 17)
 * @param {boolean} [props.animate=true] (default: true)
 */
export default function FollowPosition({
  coordinates,
  maxZoom = null,
  animate = true,
}) {
  const map = useMap();

  useEffect(() => {
    if (!map || !coordinates || coordinates.lat === 0 || coordinates.long === 0)
      return;

    const targetZoom =
      typeof maxZoom === "number"
        ? maxZoom
        : // : map.getMaxZoom
          PREFERABLE_ZOOM;

    try {
      // ensure map size is recalculated before setting view
      map.invalidateSize();
      map.setView([coordinates.lat, coordinates.long], targetZoom, { animate });
    } catch (err) {
      // swallow errors silently
      console.warn("FollowPosition: failed to set view", err);
    }
  }, [map, coordinates, maxZoom, animate]);

  return null;
}
