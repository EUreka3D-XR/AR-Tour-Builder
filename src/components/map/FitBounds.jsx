import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";

/**
 *
 * @param {Object} props
 * @param {import("leaflet").LatLngBoundsExpression} props.bounds
 * @returns {null}
 */
function FitBounds({ bounds }) {
  const map = useMap();
  const rafRef = useRef(null);

  useEffect(() => {
    if (!map) return;

    const applyFit = () => {
      try {
        // ensure map container size is correct
        map.invalidateSize();

        if (bounds && Array.isArray(bounds) && bounds.length === 2) {
          // defensive: ensure numeric values
          const [[sLat, sLng], [nLat, nLng]] = bounds;
          if (
            Number.isFinite(sLat) &&
            Number.isFinite(sLng) &&
            Number.isFinite(nLat) &&
            Number.isFinite(nLng)
          ) {
            const isPoint = sLat === nLat && sLng === nLng;
            if (isPoint) {
              // single point -> setView with a sane zoom
              const zoom = Math.min(map.getMaxZoom?.() ?? 18, 16);
              map.setView([sLat, sLng], zoom);
            } else {
              map.fitBounds(bounds, { padding: [40, 40], maxZoom: 16 });
            }
            return;
          }
        }

        // fallback bounds if none or invalid
        const europeBounds = [
          [34, -25],
          [72, 60],
        ];
        map.fitBounds(europeBounds, { padding: [40, 40], maxZoom: 6 });
      } catch (err) {
        // swallow errors and log for debugging
        // console.warn("FitBounds failed:", err);
      }
    };

    // delay to next paint + small timeout so container layout stabilizes
    rafRef.current = requestAnimationFrame(() => {
      setTimeout(applyFit, 30);
    });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [map, bounds]);

  return null;
}

export default FitBounds;
