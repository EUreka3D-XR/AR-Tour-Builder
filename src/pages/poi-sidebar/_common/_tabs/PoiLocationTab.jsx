import { useMemo } from "react";
import { useParams } from "react-router";

import { useProjectTourMultilingual } from "@/services/toursService";
import CoordinatesInput from "@/components/coordinates-input/CoordinatesInput";
import { convertToLeafletBounds } from "@/components/map/utils/mapConverters";

function PoiLocationTab() {
  const { tourId } = useParams();

  const { data: tour } = useProjectTourMultilingual(tourId);

  const bounds = useMemo(() => convertToLeafletBounds(tour?.boundBox), [tour]);

  return (
    <div className="poi-location-tab">
      <CoordinatesInput
        name="coordinates"
        showHelperText
        showMap
        defaultBounds={bounds}
      />
    </div>
  );
}

export default PoiLocationTab;
