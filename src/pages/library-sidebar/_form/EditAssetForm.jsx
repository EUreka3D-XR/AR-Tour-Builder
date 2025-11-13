import { useParams } from "react-router";

import {
  useLibraryAssetMultilingual,
  useUpdateAsset,
} from "@/services/libraryService";
import SidebarSkeleton from "../_common/_utils/SidebarSkeleton";
import AssetFormContainer from "./AssetFormContainer";

function EditAssetForm({ onClose }) {
  const { projectId, assetId } = useParams();

  const { data, fetchState } = useLibraryAssetMultilingual(projectId, assetId);
  const { mutate: updateAsset } = useUpdateAsset(projectId, assetId);

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
    <AssetFormContainer
      defaultValues={data}
      onSubmit={onSubmit}
      onClose={handleClose}
    />
  );
}

export default EditAssetForm;
