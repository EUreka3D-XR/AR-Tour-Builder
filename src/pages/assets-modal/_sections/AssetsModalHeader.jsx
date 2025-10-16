import { IconButton, styled, Typography } from "@mui/material";

import EurekaIcon from "@/components/icon/EurekaIcon";

const ModalHeader = styled("div")(({ theme }) => ({
  padding: theme.spacing(2, 2, 2, 4),
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

function AssetsModalHeader({ onClose }) {
  return (
    <ModalHeader>
      <Typography variant="h5" id="assets-modal-title">
        Import Media Assets
      </Typography>
      <IconButton onClick={onClose}>
        <EurekaIcon name="close" />
      </IconButton>
    </ModalHeader>
  );
}

export default AssetsModalHeader;
