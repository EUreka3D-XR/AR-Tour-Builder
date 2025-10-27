import { useMemo } from "react";
import { useWatch } from "react-hook-form";

import InjectedLocaleValue from "@/components/inject-locale-value/InjectLocaleValue";
import Map from "@/components/map/Map";
import PoiMarker from "@/components/map/markers/PoiMarker";
import { convertToLeafletBounds } from "@/components/map/utils/mapConverters";
import useNavPaths from "@/hooks/useNavPaths";

function TourPoisMapSection({ containerRef }) {
  const { routes, navigate } = useNavPaths();

  const tourBoundBox = useWatch({ name: "boundBox" });
  const pois = useWatch({ name: "pois" }) || [];

  const bounds = useMemo(
    () => convertToLeafletBounds(tourBoundBox),
    [tourBoundBox],
  );

  const handlePoiClick = (id) => {
    navigate(routes.pois.one(id));
  };

  return (
    <Map bounds={bounds}>
      {pois.map((poi) => (
        <PoiMarker
          key={poi.id}
          id={poi.id}
          title={<InjectedLocaleValue value={poi.title} />}
          coordinates={poi.coordinates}
          thumbnail={poi.thumbnail}
          containerRef={containerRef}
          onClick={handlePoiClick}
        />
      ))}
    </Map>
  );
}

export default TourPoisMapSection;
