import { IconButton, styled, Tooltip } from "@mui/material";

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
  const { routes, navigate } = useNavPaths();

  // TODO: -
  const handleView = () => {};

  const handleEdit = () => {
    navigate(routes.library.edit(assetId));
  };

  // TODO: -
  const handleDelete = () => {};

  return (
    <CellStyled>
      <Tooltip title="View Asset">
        <IconButtonStyled size="small" onClick={handleView}>
          <EurekaIcon name="visibility" fontSize="small" />
        </IconButtonStyled>
      </Tooltip>
      <Tooltip title="Edit Asset">
        <IconButtonStyled size="small" onClick={handleEdit}>
          <EurekaIcon name="edit" fontSize="small" />
        </IconButtonStyled>
      </Tooltip>
      <Tooltip title="Delete Asset">
        <IconButtonStyled size="small" onClick={handleDelete}>
          <EurekaIcon name="delete" fontSize="small" />
        </IconButtonStyled>
      </Tooltip>
    </CellStyled>
  );
}

export default AssetActionsCell;
