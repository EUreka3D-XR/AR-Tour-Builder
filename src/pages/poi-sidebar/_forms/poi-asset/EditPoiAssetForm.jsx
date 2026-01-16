import { useParams, useSearchParams } from "react-router";

import {
  usePoiAssetMultilingual,
  useUpdatePoiAsset,
} from "@/services/assetsService";
import { useLocale } from "@/hooks/useLocale";
import SidebarSkeleton from "../../_common/_utils/SidebarSkeleton";
import PoiAssetFormContainer from "./PoiAssetFormContainer";

function EditPoiAssetForm({ onClose }) {
  const { poiId, tourId } = useParams();

  const [searchParams] = useSearchParams();
  const mediaId = searchParams.get("mediaId");

  const locale = useLocale();

  const { data, fetchState } = usePoiAssetMultilingual(mediaId);
  const { mutate: updateAsset } = useUpdatePoiAsset(
    tourId,
    poiId,
    mediaId,
    locale,
  );

  if (fetchState.isLoading) return <SidebarSkeleton />;
  if (fetchState.isError) return <div>Error loading asset.</div>;

  const onSubmit = async (data) => {
    await updateAsset({ data });
    onClose();
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
