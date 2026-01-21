import { useParams } from "react-router";

import { useTourPoiCoordinates } from "@/services/poiService";
import SidebarSkeleton from "../../_common/_utils/SidebarSkeleton";
import PoiAssetForm from "./PoiAssetForm";

function PoiAssetFormContainer({
  defaultValues: propsDefaultValues,
  onSubmit,
  onClose,
}) {
  const { poiId } = useParams();

  const { data: coordinates, fetchState } = useTourPoiCoordinates(poiId);

  if (fetchState.isError) return <div>Error loading POI coordinates.</div>;

  if (fetchState.isLoading || !coordinates) return <SidebarSkeleton />;

  if (fetchState.isSuccess && coordinates) {
    let existingGeoreference = propsDefaultValues?.georeference;
    if (!existingGeoreference || !georeferenceExists(existingGeoreference)) {
      existingGeoreference = {
        isGeoreferenced: false,
        coordinates,
      };
    }
    const defaultValues = {
      ...propsDefaultValues,
      georeference: existingGeoreference,
    };
    return (
      <PoiAssetForm
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    );
  }

  return null;
}

export default PoiAssetFormContainer;

const georeferenceExists = (georeference) => {
  return (
    georeference &&
    georeference.coordinates &&
    georeference.coordinates.latitude != null &&
    georeference.coordinates.longitude != null
  );
};
