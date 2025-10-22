import { useMemo } from "react";
import { useWatch } from "react-hook-form";

import Map from "@/components/map/Map";
import PoiMarker from "@/components/map/PoiMarker";
import { convertToLeafletBounds } from "@/components/map/utils/mapConverters";

function TourPoisMapSection({ containerRef }) {
  const tourBoundBox = useWatch({ name: "boundBox" });
  const pois = useWatch({ name: "pois" }) || [];

  const bounds = useMemo(
    () => convertToLeafletBounds(tourBoundBox),
    [tourBoundBox],
  );

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
