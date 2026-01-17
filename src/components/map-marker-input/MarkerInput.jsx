import { useFormContext, useWatch } from "react-hook-form";

import PlaceableMarker from "../map/markers/PlaceableMarker";
import {
  convertToCoordinates,
  convertToLeafletLatLngClass,
} from "../map/utils/mapConverters";

function MarkerInput({ name }) {
  // If used inside a react-hook-form context and a name is provided, use Controller

  const value = useWatch({ name, compute: convertToLeafletLatLngClass });
  const { setValue } = useFormContext();

  const handleChange = (latlng) => {
    const coordinates = convertToCoordinates(latlng);
    setValue(
      name,
      { lat: coordinates.lat, long: coordinates.long },
      {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      },
    );
  };

  if (!value) {
    return null;
  }

  return <PlaceableMarker position={value} onChange={handleChange} />;
}

export default MarkerInput;
