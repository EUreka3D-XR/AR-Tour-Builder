import { useParams } from "react-router";
import { IconButton, styled, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";

import { useAssetModal } from "@/stores/asset-modal-stores";
import { useConfirm } from "@/stores/confirmation-modal-stores";
import { useDeleteAsset } from "@/services/libraryService";
import EurekaIcon from "@/components/icon/EurekaIcon";
import useNavPaths from "@/hooks/useNavPaths";

const CellStyled = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  justifyContent: "flex-end",
}));

const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: theme.shape.borderRadius,
}));

/**
 *
 * @param {Object} props
 * @param {string} props.assetId
 * @returns
 */
function AssetActionsCell({ assetId }) {
  const { t } = useTranslation();
  const { projectId } = useParams();
  const { openLibraryMediaModal } = useAssetModal();
  const { mutate: deleteAsset } = useDeleteAsset(projectId, assetId);

  const { routes, navigate } = useNavPaths();
  const confirm = useConfirm();

  const handleView = () => {
    openLibraryMediaModal({ assetId, projectId });
  };

  const handleEdit = () => {
    navigate(routes.library.edit(assetId));
  };

  const handleDelete = async () => {
    await confirm({
      title: t("library.actions.deleteConfirm.title"),
      message: t("library.actions.deleteConfirm.message"),
      confirmText: t("library.actions.deleteConfirm.confirmText"),
      action: deleteAsset,
    });
  };

  return (
    <CellStyled>
      <Tooltip title={t("library.actions.view")}>
        <IconButtonStyled size="small" onClick={handleView}>
          <EurekaIcon name="visibility" fontSize="small" />
        </IconButtonStyled>
      </Tooltip>
      <Tooltip title={t("library.actions.edit")}>
        <IconButtonStyled size="small" onClick={handleEdit}>
          <EurekaIcon name="edit" fontSize="small" />
        </IconButtonStyled>
      </Tooltip>
      <Tooltip title={t("library.actions.delete")}>
        <IconButtonStyled size="small" onClick={handleDelete}>
          <EurekaIcon name="delete" fontSize="small" />
        </IconButtonStyled>
      </Tooltip>
    </CellStyled>
  );
}

export default AssetActionsCell;
