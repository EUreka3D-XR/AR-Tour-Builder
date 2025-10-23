import { useParams, useSearchParams } from "react-router";

import { usePoiAssetMultilingual } from "@/services/assetsService";
import PoiAssetForm from "./PoiAssetForm";

function EditPoiAssetForm({ onClose }) {
  const { projectId, tourId, poiId } = useParams();
  const [searchParams] = useSearchParams();
  const mediaId = searchParams.get("mediaId");

  const { data, fetchState } = usePoiAssetMultilingual(
    projectId,
    tourId,
    poiId,
    mediaId,
  );

  if (fetchState.isLoading) return <div>Loading...</div>;
  if (fetchState.isError) return <div>Error loading asset.</div>;

  const onSubmit = (data) => {
    console.log("Submitted data:", data);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <PoiAssetForm
      defaultValues={data}
      onSubmit={onSubmit}
      onClose={handleClose}
    />
  );
}

export default EditPoiAssetForm;
