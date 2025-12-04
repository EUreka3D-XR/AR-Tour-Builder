import { useParams } from "react-router";
import { useTranslation } from "react-i18next";

import {
  useLibraryAssetMultilingual,
  useUpdateAsset,
} from "@/services/libraryService";
import SidebarSkeleton from "../_common/_utils/SidebarSkeleton";
import AssetFormContainer from "./AssetFormContainer";

function EditAssetForm({ onClose }) {
  const { t } = useTranslation();
  const { projectId, assetId } = useParams();

  const { data, fetchState } = useLibraryAssetMultilingual(assetId);
  const { mutate: updateAsset } = useUpdateAsset(projectId, assetId);

  if (fetchState.isLoading) return <SidebarSkeleton />;
  if (fetchState.isError) return <div>{t("librarySidebar.edit.error")}</div>;

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
