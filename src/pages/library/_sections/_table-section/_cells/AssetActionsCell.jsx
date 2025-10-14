import { IconButton, styled, Tooltip } from "@mui/material";

import EurekaIcon from "@/components/icon/EurekaIcon";

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

function AssetActionsCell() {
  return (
    <CellStyled>
      <Tooltip title="View Asset">
        <IconButtonStyled title="View Asset" size="small">
          <EurekaIcon name="visibility" fontSize="small" />
        </IconButtonStyled>
      </Tooltip>
      <Tooltip title="Edit Asset">
        <IconButtonStyled title="Edit Asset" size="small">
          <EurekaIcon name="edit" fontSize="small" />
        </IconButtonStyled>
      </Tooltip>
      <Tooltip title="Delete Asset">
        <IconButtonStyled title="Delete Asset" size="small">
          <EurekaIcon name="delete" fontSize="small" />
        </IconButtonStyled>
      </Tooltip>
    </CellStyled>
  );
}

export default AssetActionsCell;
