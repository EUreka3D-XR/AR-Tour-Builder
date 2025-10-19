import { useMemo } from "react";

import Map from "@/components/map/Map";
import { convertToLeafletBounds } from "@/components/map/mapConverters";
import PoiMarker from "@/components/map/PoiMarker";

function TourPoisMapSection({ tourBoundBox, pois, containerRef }) {
  const bounds = useMemo(
    () => convertToLeafletBounds(tourBoundBox),
    [tourBoundBox],
  );

  if (!bounds) {
    return null;
  }
  return (
    <Map bounds={bounds}>
      {pois.map((poi) => (
        <PoiMarker
          key={poi.id}
          id={poi.id}
          title={poi.title.locales.en}
          coordinates={poi.coordinates}
          thumbnail={poi.thumbnail}
          containerRef={containerRef}
        />
      ))}
    </Map>
  );
}

export default TourPoisMapSection;
