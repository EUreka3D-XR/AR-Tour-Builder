import { useParams, useSearchParams } from "react-router";

import { usePoiAssetMultilingual } from "@/services/assetsService";
import SidebarSkeleton from "../../_common/_utils/SidebarSkeleton";
import PoiAssetFormContainer from "./PoiAssetFormContainer";

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

  if (fetchState.isLoading) return <SidebarSkeleton />;
  if (fetchState.isError) return <div>Error loading asset.</div>;

  const onSubmit = (data) => {
    console.log("Submitted data:", data);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <PoiAssetFormContainer
      defaultValues={data}
      onSubmit={onSubmit}
      onClose={handleClose}
    />
  );
}

export default EditPoiAssetForm;
